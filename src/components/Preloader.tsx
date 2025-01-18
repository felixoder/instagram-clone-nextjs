'use client';
import { PacmanLoader } from "react-spinners";

export default function Preloader() {
  return(
  <>
      <div>
      <PacmanLoader
          color="#aaa"
          loading={true} 
          speedMultiplier={3} />
      </div>
  </>
  )
}
