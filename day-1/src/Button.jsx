import './App.css'

function Button({ label = 'Click', onClick = () => {} }) {
	return (
		<button className="btn" onClick={onClick}>
			{label}
		</button>
	)
}

export default Button
