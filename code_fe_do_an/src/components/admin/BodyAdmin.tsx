import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BodyAdmin.css";

const name = [
  {
    name: "Nguyễn Chí Hải",
    phone: "0358767282",
    mail: "hainche151148@fpt.edu.vn",
    dob: "07/02/2001",
    section: "JPD113",
  },

  {
    name: "Bùi Kiều Mai",
    phone: "0358767282",
    mail: "hainche151148@fpt.edu.vn",
    dob: "07/02/2001",
    section: "JPD113",
  },
  {
    name: "Trần Thị Thao",
    phone: "0358767282",
    mail: "hainche151148@fpt.edu.vn",
    dob: "07/02/2001",
    section: "JPD113",
  },
  {
    name: "Tạ Nhật Minh",
    phone: "0358767282",
    mail: "hainche151148@fpt.edu.vn",
    dob: "07/02/2001",
    section: "JPD113",
  },
  {
    name: "Đỗ Trần Quang Huy",
    phone: "0358767282",
    mail: "hainche151148@fpt.edu.vn",
    dob: "07/02/2001",
    section: "JPD113",
  },
  {
    name: "Đỗ Trần Quang Huy",
    phone: "0358767282",
    mail: "hainche151148@fpt.edu.vn",
    dob: "07/02/2001",
    section: "JPD113",
  },
];

export default function BodyAdmin() {
  return (
    <div className="flex w-full pt-6 pl-3">
      {/*Body content*/}
      <div className="w-full p-2 ">
        <div className="flex flex-row justify-between">
          {/* button */}
          <div className="flex p-3">
            <button className="w-40 h-12  border border-gray-300 btn_option w-50 rounded-s-[8px] ">
              Content manager
            </button>
            <button className="w-40 h-12  border border-gray-300 btn_option rounded-e-[8px] ">
              User
            </button>
          </div>
          {/* Thanh search */}
          <div className="relative w-1/3 left-16">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute text-black transform -translate-y-1/2 left-6 top-1/2"
            />
            <input
              type="text"
              placeholder="Search"
              className="pl-8 border border-gray-500 w-80 h-11 rounded-3xl m-[3%]"
            />
          </div>
        </div>
        {/* Thanh danh sach */}
        <div className="w-full">
          {/* table */}
          <div className="p-3">
            <Table className="border border-inherit">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="w-1/6 text-center text-black">
                    <strong>Họ và tên</strong>
                  </TableHead>
                  <TableHead className="w-1/6 text-center text-black">
                    <strong>SĐT</strong>
                  </TableHead>
                  <TableHead className="w-1/6 text-center text-black">
                    <strong>Mail</strong>
                  </TableHead>
                  <TableHead className="w-1/6 text-center text-black">
                    <strong>Ngày sinh</strong>
                  </TableHead>
                  <TableHead className="w-1/6 text-center text-black">
                    <strong>Các nhóm bài</strong>
                  </TableHead>
                  <TableHead className="w-1/6 text-center text-black">
                    <strong>Status</strong>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {name.map((name, index) => (
                  <TableRow key={index}>
                    <TableCell className="border border-inherit">
                      {name.name}
                    </TableCell>
                    <TableCell className="border border-inherit">
                      {name.phone}
                    </TableCell>
                    <TableCell className="border border-inherit">
                      {name.mail}
                    </TableCell>
                    <TableCell className="border border-inherit">
                      {name.dob}
                    </TableCell>
                    <TableCell className="border border-inherit">
                      {name.section}
                    </TableCell>
                    <TableCell className="border border-inherit">
                      <select>
                        <option value="active">Active</option>
                        <option value="deactive">Deactive</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-row">
            <button className="flex flex-col items-center m-2 btn_phantrang w-9 h-">
              <p className="m-[6px] ">1</p>
            </button>
            <button className="flex flex-col items-center m-2 w-9 btn_phantrang h-9 ">
              <p className="m-[6px]">2</p>
            </button>
            <button className="flex flex-col items-center m-2 w-9 btn_phantrang h-9 ">
              <p className="m-[6px]">3</p>
            </button>
            <button className="flex flex-col items-center m-2 w-9 btn_phantrang h-9 ">
              <p className="m-[6px]">...</p>
            </button>
            <button className="flex flex-col items-center m-2 w-9 btn_phantrang h-9 ">
              <p className="m-[6px]">98</p>
            </button>
            <button className="flex flex-col items-center m-2 w-9 btn_phantrang h-9 ">
              <p className="m-[6px]">99</p>
            </button>
            <button className="flex flex-col items-center m-2 w-9 btn_phantrang h-9 ">
              <p className="m-[6px]">100</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
