import InputComponent from "../InputComponent";

export default function OtherServer() {
  return (
    <div className='flex items-center gap-2'>
      <p>Other:</p>
      <InputComponent placeHolder={'Server name'}/>
    </div>
  );
}
