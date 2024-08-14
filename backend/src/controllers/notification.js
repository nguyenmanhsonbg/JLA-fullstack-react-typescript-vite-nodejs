const { Op } = require("sequelize");
const { Notification } = require('../../models');
const { Account } = require('../../models');
const {
	responseWithData,
	badRequest,
	error,
} = require("../handlers/response_handler");

const {
	CREATE_NOTI_SUCCESS,
	CREATE_NOTI_FAILED,
	GET_NOTI_FAILED,
	GET_NOTI_SUCCESS,
	INVALID_NOTI_ID,
	UPDATE_NOTI_SUCCESS,
	UPDATE_NOTI_FAILED,
	INVALID_NOTI_TYPE,
	TITLE_GUARD,
	CONTENT_GUARD,
	NOTI_DATE_GUARD,
	READ_GUARD,
	TARGET_ID_GUARD,
	SOURCE_ID_GUARD,
	INVALID_NOTI_GET_ID,
	IDS_GUARD,
	DELETE_NOTIS_FAILED,
	DELETE_NOTIS_SUCCESS
} = require('../messages/notification');
const { UNEXPECTED_ERROR } = require("../messages");

const NOTI_GET_TYPES = ['all','read','unread', 'allWithUnsent']
const DATE_FORMAT_REG = new RegExp(/^\d{4}-\d{2}-\d{2}$/)

const createOrUpdateNoti = async (req, res) => {
    try {
		const {
			noti_id,
			title, 
			content, 
			action, 
			target_id, 
			source_id,
			noti_date = '2024-08-01', // TODO: update this to use helper format instead of hard code later
			is_create_multiple = false
		} = req.body;

		// validate data // TODO: update this if there is any other way to guard data type
		const guardErrors = []
		if(title && title.trim().length === 0) guardErrors.push(TITLE_GUARD)
		if(content && content.trim().length === 0) guardErrors.push(CONTENT_GUARD)
		if(noti_date && !DATE_FORMAT_REG.test(noti_date)) guardErrors.push(NOTI_DATE_GUARD)
		if(target_id && typeof target_id !== 'number') guardErrors.push(TARGET_ID_GUARD)
		if(source_id && typeof source_id !== 'number') guardErrors.push(SOURCE_ID_GUARD)

		if(guardErrors.length > 0) return responseWithData(res, 400, guardErrors)
	
		const isEditNoti = !!noti_id

		return isEditNoti ? 
			await _updateNotiUsecase({
				noti_id,
				title, 
				content,
				noti_date,
				res
			}) : 
			await _createNotiUseCase({
				title, 
				content, 
				action, 
				target_id, 
				source_id,
				noti_date,
				is_create_multiple,
				res
			})
		
	} catch (e) {
		console.error(UNEXPECTED_ERROR, e);
		return badRequest(res, UNEXPECTED_ERROR);
	}
}

const _createNotiUseCase = async ({
	title, 
	content, 
	action, 
	target_id, 
	source_id,
	noti_date,
	is_create_multiple,
	res
}) => {
	try {
		const notiDateTransfer = new Date(noti_date) // TODO: update to make it schedule able

		const notiRes = []

		if (is_create_multiple) {
			const userAccounts = await Account.find({ where: { role: 4 } });
			if(userAccounts && userAccounts.length > 0) {
				await Promise.all(() => {
					userAccounts.map(user => {
						const noti = createOneNoti({ 
							title, 
							content,
							is_read: false,
							action, 
							target_id: user.account_id,
							source_id, 
							noti_date: notiDateTransfer,
							created_at: new Date()
						})
						notiRes.push(noti)
					})
				})
			} 
		} else {
			const noti = await createOneNoti({ 
				title, 
				content,
				is_read: false,
				action, 
				target_id,
				source_id, 
				noti_date: notiDateTransfer,
				created_at: new Date()
			})
			notiRes.push(noti)
		}

		
		if (notiRes && notiRes.length > 0) {
			return responseWithData(res, 201, { data: notiRes, message: CREATE_NOTI_SUCCESS }); // TODO: updat this message
		} else {
			return badRequest(res, CREATE_NOTI_FAILED);
		}
	} catch (err) {
		console.error(CREATE_NOTI_FAILED, err);
		return badRequest(res, CREATE_NOTI_FAILED)
	}
}

const _updateNotiUsecase = async ({
	noti_id,
	title, 
	content,
	noti_date,
	res
}) => {
	try {
		const notiId = parseInt(noti_id)

		const updatingNoti = notiId && await Notification.findOne({ 
			where: { noti_id: notiId }
		});

		if (!updatingNoti) return badRequest(res, INVALID_NOTI_ID);

		// check if the notification is from admin or not
		const sourceUser = await Account.findOne({
			where: { account_id: updatingNoti.source_id }
		})
		if (!sourceUser) return badRequest(res, SOURCE_ID_GUARD)

		if (sourceUser.role_id === 1) {
			// update data
			const updateData = {
				title: title ? title : updatingNoti.title,
				content: content ? content : updatingNoti.content,
				noti_date: noti_date ? new Date(noti_date) : updatingNoti.noti_date,
			}
			const updateRes = await updatingNoti.update(updateData)

			if (updateRes) {
				return responseWithData(res, 200, { data: updateRes, message: UPDATE_NOTI_SUCCESS});
			} else {
				return badRequest(res, UPDATE_NOTI_FAILED);
			}
		}
	} catch (err) {
		console.error(UPDATE_NOTI_FAILED, err);
		return badRequest(res, UPDATE_NOTI_FAILED);
	}
}

const createOneNoti = async (notiDTO) => {
	return await Notification.create(notiDTO);
}

const getNotiById = async (req, res) => {
	try {
		const { source_id, target_id, type = "all", next_page = 1, limit = 10 } = req.body;

		// validate data // TODO: update if there is other way to guard data type
		if( !NOTI_GET_TYPES.includes(type)) return badRequest(res, INVALID_NOTI_TYPE)
		if( (source_id && !Number.isInteger(source_id)) || (target_id && !Number.isInteger(target_id)))
			return badRequest(res, INVALID_NOTI_GET_ID)

		// decide is_read condition
		let readCondition = {}
		switch(type) {
			case 'read':
				readCondition = { is_read: true }
				break;
			case 'unread':
				readCondition = { is_read: false }
				break
			default: 
				break
		}

		const targetIdCondition = target_id && Number.isInteger(target_id) ? { target_id: Number.parseInt(target_id) } : {}
		const sourceIdCondition = source_id && Number.isInteger(source_id) ? { source_id: Number.parseInt(source_id) } : {}

		const idCondition = {
			...targetIdCondition,
			...sourceIdCondition,
		}

		const notiDateCondition = type === 'allWithUnsent' ? {} : {
			noti_date: {
				[Op.lte] : new Date()
			}
		}

		// get data
		const { count, rows } = await Notification.findAndCountAll({ 
			where: { 
				...idCondition,
				...readCondition,
				...notiDateCondition
			},
			limit: limit,
			offset: limit * (next_page - 1),
			order: [
				['noti_date', 'DESC' ],
				['created_at', 'DESC' ]
			]
		});

		if (rows) {
			const response = {
				data: rows,
				total_pages: Math.ceil(count / limit),
				current_page: parseInt(next_page),
			}
			return responseWithData(res, 200, { data: response, message: GET_NOTI_SUCCESS }); // TODO: updat this message
		} else {
			return badRequest(res, GET_NOTI_FAILED);
		}
	} catch (e) {
		console.error(GET_NOTI_FAILED, e);
		return badRequest(res, GET_NOTI_FAILED);
	}
}

const deleteNoti = async (req, res) => {
	try {
		const { ids } = req.body;

		// validate data // TODO: update this if there is any other way to guard data type
		const guardErrors = []
		if(ids && !Array.isArray(ids) || ids.length === 0) guardErrors.push(IDS_GUARD)
			
		if(guardErrors.length > 0) return responseWithData(res, 400, guardErrors)

		const notiIds = ids.map(id => parseInt(id))

		const result = await Notification.destroy({
			where: {
				noti_id: {
					[Op.in] : notiIds
				}
			}
		})
		
		return responseWithData(res, 200, { data: result, message: DELETE_NOTIS_SUCCESS })
	} catch (e) {
		console.error(DELETE_NOTIS_FAILED, e.parent);
		return badRequest(res, DELETE_NOTIS_FAILED);
	}
}

module.exports = {
    getNotiById,
    createOrUpdateNoti,
	deleteNoti
}