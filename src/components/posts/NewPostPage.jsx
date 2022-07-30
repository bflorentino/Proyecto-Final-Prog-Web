import React from 'react'

const NewPostPage = () => {

  return (
    <section className='FormPost__cont' >
      
      <form action="" className='FormPost__form'>

        <div className='FormPost__fieldCont'>
          <div className='FormPost__fieldTitle'>
            <h3 className='FormPost__h3'>Identidad en la declaración</h3> 
          </div>
          <div className='FormPost__fieldInp'>
            <div>
              <input type="radio" name='privacy' id='anonimous'  />
              <label htmlFor="anonimous" className='FormPost__label'>Anónimo</label>
            </div>

            <div>
              <input type="radio" name='privacy' id='public' />
              <label htmlFor="public" className='FormPost__label'>Pública</label>
            </div>
          </div>
        </div>

        <div className='FormPost__fieldCont'>
          <div className='FormPost__fieldTitle'>
            <h3 className='FormPost__h3'>Destinatario de la declaración</h3>
          </div>
          <div className='FormPost__fieldInp'>
            <select name="" id="" className='FormPost__input'>
              <option value="Ninguna" defaultValue>Ninguna </option>
              <option value="">Bryan Xavier Florentino Montero</option>
              <option value="">Bryan Xavier Florentino Montero</option>
              <option value="">Bryan Xavier Florentino Montero</option>
              <option value="">Bryan Xavier Florentino Montero</option>
              <option value="">Bryan Xavier Florentino Montero</option>
              <option value="">Bryan Xavier Florentino Montero</option>
              <option value="">Bryan Xavier Florentino Montero</option>
              <option value="">Bryan Xavier Florentino Montero</option>
              <option value="">Bryan Xavier Florentino Montero</option>
              <option value="">Bryan Xavier Florentino Montero</option>
              <option value="">Bryan Xavier Florentino Montero</option>
            </select>
          </div>
        </div>

        <div className='FormPost__fieldCont'>
          <div className='FormPost__fieldTitle'>
            <h3 className='FormPost__h3'>Visibilidad</h3> 
          </div>

          <div className='FormPost__fieldInp'>
            <div>
              <input type="radio" name='visibility' id='priv' />
              <label htmlFor="priv" className='FormPost__label'>Anónimo</label>
            </div>
            <div>
              <input type="radio" name='visibility' id='pub' />
              <label htmlFor="pub" className='FormPost__label'>Pública</label>
            </div>
          </div>
        </div>

        <div className='FormPost__fieldCont'>

          <div className='FormPost__fieldTitle'>
            <h3 className='FormPost__h3'>Contenido de la declaración</h3> 
          </div>

          <div className='FormPost__fieldInp'>
              <textarea name='content' className='FormPost__textarea'  />
          </div>
        </div>

      </form>

    </section>
  )
}

export default NewPostPage