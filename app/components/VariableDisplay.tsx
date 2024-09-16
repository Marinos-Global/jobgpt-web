import {Check, ClipboardList, Info} from "lucide-react";
import {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "~/components/ui/tooltip";

export interface Variable {
  name: string
  description: string
  templateVariable: string
  example: string
}

interface VariableDisplayProps {
  variable: Variable
}
async function copyToClipboard(textToCopy:string) {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy);
  } else {
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    // Move textarea out of the viewport so it's not visible
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  }
}

export default function VariableDisplay(props: VariableDisplayProps) {
  const [iconClass, setIconClass] = useState("")
  const [checkClass, setCheckClass] = useState("hidden")

  const handleCopy = async () => {
    await copyToClipboard(props.variable.templateVariable)
    setIconClass("hidden")
    setCheckClass("")
    setTimeout(() => {
      setIconClass("")
      setCheckClass("hidden")
    }, 1000);
    // navigator.clipboard.writeText(props.variable.templateVariable).then(r => {
    //   setIconClass("hidden")
    //   setCheckClass("")
    //   setTimeout(() => {
    //     setIconClass("")
    //     setCheckClass("hidden")
    //   }, 1000);
    // })
  }
  const displayValue = () => {
    if (iconClass.length === 0) {
      return props.variable.name
    } else {
      return "Copied!"
    }
  }
  return (
      <div className="w-full max-w-sm pr-2 pl-2 pt-4">
        <div className="flex items-center">
          <span
              className="flex-shrink-0 inline-flex items-center py-2 px-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger><Info/></TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="text-left">
                  <div>{props.variable.description}</div>
                  <div className="font-normal"><span className="italic">{props.variable.example}</span></div></div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <div className="relative w-full">
            <label id="website-url" aria-describedby="helper-text-explanation"
                   className="bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >{displayValue()}</label>
          </div>
          <button data-tooltip-target="tooltip-website-url" data-copy-to-clipboard-target="website-url"
                  className="flex-shrink-0 z-10 inline-flex items-center py-2 px-2 text-sm font-medium text-center text-white bg-primary rounded-e-lg focus:outline-non dark:text-secondary  border border-primary dark:border-secondary hover:border-primary dark:hover:border-secondary"
                  type="button">
            <span role="presentation" id="default-icon" className={iconClass} onClick={handleCopy} onKeyDown={handleCopy}>
                <ClipboardList/>
            </span>
            <span id="success-icon" className={`${checkClass} inline-flex items-center`}>
                <Check/>
            </span>
          </button>
        </div>
      </div>
  )
}