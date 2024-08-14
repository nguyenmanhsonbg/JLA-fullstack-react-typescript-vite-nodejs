// CharacterCard.tsx
import { HiMiniSpeakerWave } from "react-icons/hi2";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";
interface CharacterCardProps {
  character: {
    japanese_character: string;
    romaji_character: string;
    alphabet_audio: string;
    alphabet_image: string;
  };
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const handleAudio = (romaji_character: string) => {
    const audio = document.getElementById(
      `${romaji_character}`
    ) as HTMLAudioElement;
    audio.play();
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-4 text-center rounded-lg hover:bg-[#7db660] hover:text-white">
          <div className="text-4xl font-semibold ">
            {character.japanese_character}
          </div>
          <div className="">{character.romaji_character}</div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div>
          <img src={character.alphabet_image} />
          <div className="flex items-center justify-center pt-5">
            <Button onClick={() => handleAudio(character.romaji_character)}>
              <HiMiniSpeakerWave size={30}/>
            </Button>
          </div>
          <audio
            id={`${character.romaji_character}`}
            src={character.alphabet_audio}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterCard;
