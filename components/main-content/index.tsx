const MainContent = () => {
  return (
    <div className="flex flex-grow">
      <div className="flex flex-col flex-grow  min-h-screen">
        <div className="h-16 pt-4 flex flex-row">
          <div className="flex-grow">
            <h4>#random</h4>
          </div>
          <div className="w-4 bg-lime-600 rounded align-middle content-center flex-grow">
            #R
          </div>
        </div>
        <div className="flex-grow flex flex-col">Messages</div>
        <div className="lg:h-48">MEssaging box here</div>
      </div>
    </div>
  );
};

export default MainContent;
