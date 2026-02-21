interface IButtonProp {
    name?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}
export default function PrimaryButton({ name = 'Submit', onClick, type = "button" }: IButtonProp) {
  return (
    <button type={type} className="px-4 py-1 bg-green-500 text-white cursor-pointer rounded-md" onClick={onClick}>
      {name}
    </button>
  )
}
