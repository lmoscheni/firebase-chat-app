type ErrorMessageProps = {};

export default function ErrorMessage(_props: ErrorMessageProps): JSX.Element {
  return (
    <div className="bg-gray-200 p-6 w-3/12 max-h-28 rounded-md text-center">
      <h1 className="text-2xl text-red-500">Error!!!</h1> <p></p>
      <p>Error trying to get the messages.</p>
    </div>
  );
}
