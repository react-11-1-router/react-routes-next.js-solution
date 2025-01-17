import { useRouter } from 'next/navigation';

export default function CheckBox() {

  const router = useRouter();

  const checkHandle = (e) => {
    if (e.target.checked) {
      router.push('/subtask4');
    }
  };

  return (
    <div>
      Go to the component programmatically, by checking the box:
      <input type="checkbox" onChange={checkHandle}></input>
    </div>
  );
}