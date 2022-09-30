import ReactImageZoom from 'react-image-zoom';

function VerificationFormComponent() {
  const props = {
    width: 400,
    height: 250,
    zoomWidth: 500,
    img: 'https://picsum.photos/seed/000/1920/1080',
    zoomPosition: 'original',
  };

  return (
    <>
      {JSON.stringify(props)}
      <div className="flex flex-row">
        <div className="basis-1/2 bg-green-300">
          <ReactImageZoom {...props} />
        </div>
        <div className="basis-1/2 bg-red-300">
            Fullname: 
        </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/2 bg-green-300">
          <ReactImageZoom {...props} />
        </div>
        <div className="basis-1/2 bg-red-300">03</div>
      </div>
    </>
  );
}

export default VerificationFormComponent;
