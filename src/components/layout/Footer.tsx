import { TimeBarThemeSwitcher } from "./TimeBar"
export function Footer(){
    return(
        <div className="flex w-full px-4 py-4 bottom-1 mx-auto">
            <TimeBarThemeSwitcher />
        </div>
    )
}