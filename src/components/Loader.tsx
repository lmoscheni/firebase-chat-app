type LoaderProps = {
  isLoading: boolean;
  children?: any;
};

function Loader(props: LoaderProps): JSX.Element {
  if (!props.isLoading) {
    return props.children;
  }
  return (
    <div className="h-full flex flex-row justify-center items-center">
        <div className="h-14 w-14 rounded-sm shadow-mxl flex flex-row justify-center items-center bg-green-500 animate-spin">
            <div className="h-6 w-6 rounded-full bg-white" />
        </div>
    </div>
  );
}

export default Loader;
