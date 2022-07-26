/* eslint-disable @next/next/no-img-element */
export default function ImagePreviewComponent(props) {
  if (props.vm)
    return (
      <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-md" src={props.vm} alt="emirates id front" />
      </div>
    );
}
