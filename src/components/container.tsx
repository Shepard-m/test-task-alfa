import React from "react";
import Header from "./header";

type TContainer = {
  children: JSX.Element;
}

export default function Container({ children }: TContainer) {
  return (
    <>
      <Header/>
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
    </>
  )
}