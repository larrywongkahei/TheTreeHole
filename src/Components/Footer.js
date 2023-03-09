import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs"
import Swal from 'sweetalert2'

function Footer () {
    function toGithub(){
        window.location.href = 'https://github.com/larrywongkahei';
    }

    function toInstagram(){
        window.location.href = 'https://www.instagram.com/heiyeungyeung520';
    }

    function toLinkedin(){
        window.location.href = 'https://www.linkedin.com/in/ka-hei-wong-429b66257';
    }

    function handleContactMe(){
        Swal.fire({
            title:'Enter your email',
            html:
            `
            <input type="text" class="swal2-input" id='firstName'/>
            <input type="text" class="swal2-input" id='lastName'/>
            <input type="email "class="swal2-input" id='email'/>
            `,
            preConfirm: () => {
                const email = Swal.getPopup().querySelector('#email').value
                return {email : email}
            }
        }).then(result => {
            Swal.fire({
                title:'Success',
                text:`We will contact you via ${result.value.email} within three days.`,
                icon:'success',
                showConfirmButton:false,
                timer:3300,
                width:'56%'
            })
        })
    }

    function handleReportError(){
        Swal.fire({
            title:'Report an error',
            input:'textarea',
            value:'${content}',
        })

    }

    function handleComment(){

    }

    return (
        <div className="bg-cyan-600 pb-1 fixed bottom-0 justify-center font-medium text-xl w-full" >
            <ul className="">
                <div className="flex justify-center gap-8 pt-4">
                <li>
                    <BsGithub size={20} onClick={toGithub} className="hover:cursor-pointer"/>
                </li>
                <li>
                    <BsInstagram size={20} onClick={toInstagram} className="hover:cursor-pointer"/>
                </li>
                <li>
                    <BsLinkedin size={20} onClick={toLinkedin} className="hover:cursor-pointer"/>
                </li>
                </div>
                <div className="flex gap-10 p-2 text-sm justify-center">
                    <li className="hover:cursor-pointer" onClick={handleContactMe}>
                        Contact me
                    </li>
                    <li className="hover:cursor-pointer" onClick={handleReportError}>
                        Report error
                    </li>
                    <li className="hover:cursor-pointer" onClick={handleComment}>
                        Comment
                    </li>
                </div>
            </ul>
        </div>
    )
}

export default Footer