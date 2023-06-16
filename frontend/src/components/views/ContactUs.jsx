import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const form = useRef();
  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_hd2h5nl",
        "template_og5ehry",
        form.current,
        "LutCavkqEbwKDQ8p_"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        toast.success("Email send succesfully", {
          position: "bottom-left",
        }),
        (error) => {
          console.log(error.text);
        }
      );
    reset();
  };

  return (
    <div className="h-screen w-full bg-cover bg-[url('/../bg2.jpg')]  bg-center ">
      <div>
        <div
          className="justify-items-center
grid justify-self-stretch place-content-center
 "
        >
          {" "}
          <form
            ref={form}
            onSubmit={handleSubmit(sendEmail)}
            className="justify-center block p-6 py-14 rounded-lg  shadow-xl max-w-md  mt-20 bg-white bg-opacity-20 backdrop-blur-md drop-shadow-lg    "
          >
            {" "}
            <div className=" justify-center  flex-col  ">
              <h2 className=" font-bold text-5xl flex justify-center mb-6 text-yellow-900  ">
                Contact Us
              </h2>
            </div>
            <div className="form-group mb-6   w-96">
              <input
                {...register("user_name", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be atleast 3 charracters long",
                  },
                })}
                type="text"
                className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal    
        bg-clip-padding
        
        rounded
     "
                placeholder="Name"
                name="user_name"
              />
              <p className=" text-red-700"> {errors.user_name?.message}</p>
            </div>
            <div className="form-group mb-6">
              <input
                {...register("user_email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email must be valid",
                  },
                })}
                name="user_email"
                type="email"
                className="form-control block
              
        w-full
        px-3
        py-1.5
        text-base
        font-normal
       
        border border-solid border-amber-50
        rounded
        transition
        ease-in-out
        m-0"
                placeholder="Email"
              />
              <p className=" text-red-700">{errors.user_email?.message}</p>
            </div>
            <div className="form-group mb-6">
              <textarea
                {...register("Message", {
                  required: "Message is required",
                  minLength: {
                    value: 15,
                    message: "Message must be atleast 15 charracters long",
                  },
                  maxLength: {
                    value: 150,
                    message: "Message must be less than 150 charracters",
                  },
                })}
                name="Message"
                className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        bg-white bg-clip-padding
        border border-solid border-amber-50
        rounded
        
       
      "
                rows="3"
                placeholder="Message"
              ></textarea>
              <p className=" text-red-700"> {errors.Message?.message}</p>
            </div>
            <div className="form-group  text-center mb-6"></div>
            <button
              type="submit"
              value="send"
              className=" text-white cursor-pointer p-2 flex justify-center rounded-md shadow-md w-full bg-yellow-900 hover:bg-amber-800  mt-1 "
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
