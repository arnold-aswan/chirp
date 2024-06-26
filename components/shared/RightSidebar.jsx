import React from "react";

const RightSidebar = () => {
  return (
    <section className="hidden sticky top-0 right-0 z-20 text-white h-full px-6 md:flex md:flex-col">
      <div>
        <h3 className="font-bold">Suggested Communities</h3>
      </div>
      <div>
        <h3 className="font-bold">Suggested People</h3>
      </div>
    </section>
  );
};

export default RightSidebar;
