interface IButtonProp {
    name?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}
export default function InfoButton({ name = 'Info', onClick, type = "button" }: IButtonProp) {
  return (
    <button type={type} className="px-4 py-2 bg-gray-500/50 text-white cursor-pointer rounded-[20px] text-sm" onClick={onClick}>
      {name}
    </button>
  )
}

