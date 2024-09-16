import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/Popover";
import {Button} from "~/components/ui/button";
import {Eye} from "lucide-react";
import {Textarea} from "~/components/ui/textarea";
import {useEffect, useState} from "react";
import {cn} from "~/lib/utils";

interface PromptViewProps {
  title: string
  description: string
  fetchPrompt: (...args:any)=>Promise<string>
  updatePrompt: (...args:any)=>void
  previewPrompt: (...args:any)=>Promise<string>

}
function useDebouncedValue<T>(inputValue: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
}

export default function PromptView({title,description,fetchPrompt,updatePrompt,previewPrompt}: PromptViewProps) {

  const [previewText,setPreviewText] = useState("")
  const [prompt,setPrompt] = useState("");
  const debouncedPrompt = useDebouncedValue(prompt, 500);
  useEffect(() => {
   fetchPrompt().then(setPrompt)
  }, []);
  useEffect(() => {
    if(prompt.length>0){
      updatePrompt(prompt)
    }
  }, [debouncedPrompt]);
  const handleOpenPreview=()=>{
    previewPrompt().then(setPreviewText)
  }
  return (<div className="flex h-full items-center justify-center">
    <Card className='w-full h-auto col-span-4 border-0 shadow-none b-'>
      <CardHeader className={cn("pl-0")}>
        <CardTitle>{title} <Popover>
          <PopoverTrigger asChild>
            <Button variant="default" onClick={handleOpenPreview}><Eye className="mr-1"/>Preview</Button>
          </PopoverTrigger>
          <PopoverContent className={cn("w-full max-w-6xl")} align={"start"}>
            <span className="whitespace-pre-line">{previewText}</span>
          </PopoverContent>
        </Popover></CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2 pl-0'>
        <Textarea className="h-[calc(86vh-8rem)] focus-visible:ring-0" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
      </CardContent>
    </Card>
  </div>)
}