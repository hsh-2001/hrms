interface IButtonProp {
    name?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}
export default function PrimaryButton({ name = 'Submit', onClick, type = "button", disabled = false }: IButtonProp) {
  return (
    <button 
      type={type} 
      className={`px-4 py-2 text-white cursor-pointer rounded-[20px] text-sm w-auto ${
        disabled 
          ? 'bg-green-300 cursor-not-allowed opacity-60' 
          : 'bg-green-500 hover:bg-green-600'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  )
}
