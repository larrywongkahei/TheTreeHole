import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs"
import Swal from 'sweetalert2'
import emailjs from 'emailjs-com'
import { useRef } from "react";

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
    
    const sendEmail = (data) => {
        emailjs.send('service_1qoedwl', 'template_xeg11xd', data, 'LILAQhKwtsOMhjOYy')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

    function handleContactMe(){
        Swal.fire({
            title:'Enter your details',
            width:'45%',
            html:
            `
            <label>Enter first name</label>
            <input type="text" class="swal2-input" id='firstName' placeholder='First name'/>
            <br>
            <label>Enter last name</label>
            <input type="text" class="swal2-input" id='lastName' placeholder='Last name'/>
            <br>
            <label>Enter your email</label>
            <input type="email "class="swal2-input" id='email' placeholder='Email'/>
            `,
            preConfirm: () => {
                const email = Swal.getPopup().querySelector('#email').value
                const firstName = Swal.getPopup().querySelector('#firstName').value
                const data = {
                    'email' : email,
                    'firstName' : firstName
                }
                sendEmail(data)

                return {email : email}
            }
        }).then(result => {
            Swal.fire({
                title:'Success',
                text:`We will contact you via ${result.value.email} within few seconds.`,
                icon:'success',
                showConfirmButton:false,
                timer:3300,
                width:'56%'
            })
        })
    }

    async function handleReportError(){
        const {value : title} = await Swal.fire({
            title:'Report an error',
            input:'textarea',
            inputPlaceholder:'Enter error',
            html:
            `
            <input type="text" id='title' class='swal2-input' placeholder='Enter title' />
            `,
            icon:'info',
        })
        if(title){
            Swal.fire({
                title:'Recorded',
                icon:'success',
                showConfirmButton:false,
                timer:1500
            })
        }
    }

    async function handleComment(){
        const {value : comment} = await Swal.fire({
            title:'Leave your comment',
            input:'textarea',
            inputPlaceholder:'Comments',
        })
        if(comment){
            Swal.fire({
                icon:'success',
                text:'We appreciate your feedback!',
                showConfirmButton:false,
                timer:2000
            })
        }
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