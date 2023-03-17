import React from 'react'

const Button = (props) => {
  return (
    <button className="btn bg-blue-600 border-none text-white px-8 hover:bg-blue-700">
        {props.children}
    </button>
  )
}

export default Button
