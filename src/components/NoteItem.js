import React from 'react'

function NoteItem(props) {
  return (
    <div class="col-md-4 col-sm-6 content-card">
            <div class="card-big-shadow">
                <div class="card card-just-text" data-background="color" data-color="blue" data-radius="none">
                    <div class="content">
                        <h6 class="category">{props.title}</h6>
                        <h4 class="title"><a href="#">{props.tag}</a></h4>
                        <p class="description">{props.description} </p>
                    </div>
                </div> 
            </div>
        </div>
  )
}

export default NoteItem
