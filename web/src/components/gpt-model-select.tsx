import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "@/lib/axios";

export interface GptModel {
  id: string
  name: string
}

interface GptModelSelectProps {
  onGptModelSelected: (name: string) => void
}

export function GptModelSelect(props: GptModelSelectProps) {
  const [gptModels, setGptModels] = useState<GptModel[] | null>(null)

  useEffect(() => {
    api.get('/gpt-models').then(response => {
      setGptModels(response.data)
    })
  }, [])

  function handleGptModelSelected(name: string) {
    const selectedGptModel = gptModels?.find(gptModel => gptModel.name === name)

    if (!selectedGptModel) {
      return
    }

    props.onGptModelSelected(selectedGptModel.name)
  }

  return (
    <Select onValueChange={handleGptModelSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um modelo..." />
      </SelectTrigger>
      <SelectContent>
        {gptModels?.map(gptModel => {
          return (
            <SelectItem key={gptModel.id} value={gptModel.name}>{gptModel.name}</SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  );
}
