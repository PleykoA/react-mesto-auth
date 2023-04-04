function ImagePopup(props) {

  return (
    <div className={`popup popup_${props.name} ${props.card && 'popup_opened'}`}>
      <figure className='picture'>
        <button className='popup__close-button' type='button' onClick={props.onClose}></button>
        <img className='popup__image' alt={props.name} src={props.card && props.card.link} />
        <figcaption className='popup__caption'>{props.card?.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;
