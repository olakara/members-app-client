/* eslint-disable @next/next/no-img-element */
export default function ImagePreviewComponent(props) {
  if (props.vm)
    return (
      <div className="object-cover w-96 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
        <img className="rounded-md" src={props.vm} alt="emirates id front" />
      </div>
    );
}
