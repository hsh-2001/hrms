interface IButtonProp {
    name?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}
export default function DangerButton({ name = 'Cancel', type = "button", onClick }: IButtonProp) {
  return (
    <button type={type} className="px-4 py-1 bg-red-500 text-white cursor-pointer rounded-md text-[12px]" onClick={onClick}>
      {name}
    </button>
  )
}
