import homeImg from "../assets/homeImg.svg";

export function Rightside() {
  return (
    <div className="hidden md:block w-full md:w-1/2 lg:w-[50%] px-4 md:px-0">
      <img
        src={homeImg}
        alt="Hero"
        className="w-full h-auto"
      />

    </div>
  );
}