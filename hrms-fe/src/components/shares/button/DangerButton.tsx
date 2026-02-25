interface IButtonProp {
    name?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}
export default function DangerButton({ name = 'Cancel', type = "button", onClick }: IButtonProp) {
  return (
    <button type={type} className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded-[20px] text-sm" onClick={onClick}>
      {name}
    </button>
  )
}
