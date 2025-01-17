export default function SubTask2({searchParams}) {
  
  const searchString = Object.entries(searchParams)
    .map(([key, value]) => `${key}=${value}`)
    .join(', ');
  return (
    <div>
      Subtask2, query parameters: {searchString}
    </div>
  );
}
