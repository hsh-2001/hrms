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
      className={`px-4 py-2 cursor-pointer rounded-[20px] text-white text-sm w-auto ${
        disabled 
          ? 'bg-primary cursor-not-allowed opacity-60' 
          : 'bg-primary hover:bg-primary/70'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  )
}
