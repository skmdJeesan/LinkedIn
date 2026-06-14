import { Leftside } from "./Leftside";
import { Rightside } from "./Rightside";

export function Hero() {
  return (
    <div className="flex justify-between items-center px-24 py-10">
      <Leftside />
      <Rightside /> 
    </div>
  );
}