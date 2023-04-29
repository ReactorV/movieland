import { RotatingLines } from 'react-loader-spinner'

import '../styles/loader.scss'
export const Loader = () => {
  return (
    <div className="loader">
      <RotatingLines strokeColor="white" strokeWidth="3" animationDuration="0.75" width="40" visible={true} />
    </div>
  )
}
