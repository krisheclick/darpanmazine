"use client"
import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import Styles from "./form.module.css"
// import { useAwardContext } from "@/Context/AwardContext";
type NominateFormProps = {
  slug?: string[];
};
const NominateForm = ({ slug }: NominateFormProps) => {
    const inputFields = {
        award_category: '',
        previous_year: '',
        nominated_person: '',
        nominated_address: '',
        nominated_phone: '',
        nominated_email: '',
        nominated_website: '',
        nominated_occupation: '',
        award_reason: '',
        nominee_achievements: '',
        community_involvement: '',
        leadership_experience: '',
        other_category: '',
        why_nominated: '',
        bio: '',
        nominee_association: '',
        nominated_year: '',
        userName: '',
        userEmail: '',
        userPhone: '',
        userWebsite: '',
        userAddress: ''
    }
    const [nomineeData, setNomineeData] = useState(inputFields);

    const [errors, setError] = useState<{[key: string]: string}>({});
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmit, setSubmit] = useState(false);

    // Refference Type
    const award_category = useRef<HTMLSelectElement>(null);
    const previous_year = useRef<HTMLInputElement>(null);
    const nominated_person = useRef<HTMLInputElement>(null);
    const nominated_address = useRef<HTMLInputElement>(null);
    const nominated_phone = useRef<HTMLInputElement>(null);
    const nominated_email = useRef<HTMLInputElement>(null);
    const nominated_website = useRef<HTMLInputElement>(null);
    const nominated_occupation = useRef<HTMLInputElement>(null);
    const award_reason = useRef<HTMLTextAreaElement>(null);
    const nominee_achievements = useRef<HTMLTextAreaElement>(null);
    const community_involvement = useRef<HTMLTextAreaElement>(null);
    const leadership_experience = useRef<HTMLTextAreaElement>(null);
    const other_category = useRef<HTMLSelectElement>(null);
    const why_nominated = useRef<HTMLTextAreaElement>(null);
    const bio = useRef<HTMLTextAreaElement>(null);
    const nominee_association = useRef<HTMLTextAreaElement>(null);
    const nominated_year = useRef<HTMLInputElement>(null);
    const userName = useRef<HTMLInputElement>(null);
    const userEmail = useRef<HTMLInputElement>(null);
    const userPhone = useRef<HTMLInputElement>(null);
    const userWebsite = useRef<HTMLInputElement>(null);
    const userAddress = useRef<HTMLInputElement>(null);

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        if(!nomineeData.award_category.trim()) newErrors.award_category = "Category Name is Required";
        if(!nomineeData.previous_year.trim()) newErrors.previous_year = "Previous Year is Required";
        if(!nomineeData.nominated_person.trim()) newErrors.nominated_person = "Nominated Person is Required";
        if(!nomineeData.nominated_phone.trim()) newErrors.nominated_phone = "Nominated Phone is Required";
        if(!nomineeData.nominated_email.trim()) {
           newErrors.nominated_email = "Nominated Email is Required";
        } else if(!/^\S+@\S+\.\S+$/.test(nomineeData.nominated_email)){
           newErrors.nominated_email = "Please enter valid Nominated Email";
        }
        if(!nomineeData.nominee_achievements.trim()) newErrors.nominated_occupation = "Nominated Achievements is Required";
        if(!nomineeData.community_involvement.trim()) newErrors.community_involvement = "Community involvement is Required";
        if(!nomineeData.leadership_experience.trim()) newErrors.leadership_experience = "Leadership abilities is Required";
        if(!nomineeData.nominee_association.trim()) newErrors.nominee_association = "Association is Required";
        if(!nomineeData.userName.trim()) newErrors.userName = "Name is Required";
        if(!nomineeData.userEmail.trim()){
            newErrors.userEmail = "Email is Required";
        } else if(!/^\S+@\S+\.\S+$/.test(nomineeData.userEmail)){
           newErrors.nominated_email = "Please enter valid Email";
        }
        if(!nomineeData.userPhone.trim()) newErrors.userPhone = "Phone Number is Required";

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {id, value} = e.target;
        setNomineeData((prev) => ({...prev, [id]: value}));
        if(errors[id]){
            setError((prev) => ({...prev, [id]: ''}));
        }
    }

    const nomineeSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        if(!validateForm()) return;
        setSubmit(true);
        setStatusMessage('');
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/award/${slug}/nominee`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({...nomineeData})
            });

            if(!res.ok) throw new Error("Request failed");
            const data = await res.json();
            setStatusMessage(data?.response_message?.msg || "Message sent successfully.");
            resetForm();
        }catch(err: any){
            setStatusMessage("Something went wrong. Please try again later.");
        }finally{
            setSubmit(false);
        }
    }

    const resetForm = () => {
        setNomineeData(inputFields);
        setError({});
        setStatusMessage('');
    }

    const {category} = useAwardContext();
  return (                  
    <div id="nomineeForm" className={Styles.nominateForm} >
        <div className={Styles.heading}>Nominate Now</div>
        <form onSubmit={nomineeSubmit}>
            <div className={Styles.formGroup}>
                <label htmlFor="award_category">Award Category : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <select name="award_category" id="award_category" className="form-control" onChange={handleChange} ref={award_category} value={nomineeData.award_category}>
                        <option value="">--select--</option>
                        {category?.split('#@#').map((value, key) => {
                            const [name, description] = value.split('|');
                            return(
                                <option key={name} value={name}>{name}</option>
                            )
                        })}
                    </select>
                    {errors.award_category && <div className="text-danger">{errors.award_category}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="previous_year">Has he/she been nominated for Darpan Extraordinary Achievent Awards in a previous year? : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <input type="text" id="previous_year" className="form-control"
                        ref={previous_year} value={nomineeData.previous_year} onChange={handleChange}
                    />
                    {errors.previous_year && <div className="text-danger">{errors.previous_year}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="nominated_person">Name of the person being nominated : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <input type="text" id="nominated_person" className="form-control"
                        ref={nominated_person} value={nomineeData.nominated_person} onChange={handleChange}
                    />
                    {errors.nominated_person && <div className="text-danger">{errors.nominated_person}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="nominated_address">Address </label>
                <div className={Styles.formGroup_in}>
                    <input type="text" id="nominated_address" className="form-control"
                        ref={nominated_address} value={nomineeData.nominated_address} onChange={handleChange}
                    />
                    {errors.nominated_address && <div className="text-danger">{errors.nominated_address}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="nominated_phone">Phone : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <input type="text" id="nominated_phone" className="form-control"
                        ref={nominated_phone} value={nomineeData.nominated_phone} onChange={handleChange}
                    />
                    {errors.nominated_phone && <div className="text-danger">{errors.nominated_phone}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="nominated_email">Email : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <input type="email" id="nominated_email" className="form-control"
                        ref={nominated_email} value={nomineeData.nominated_email} onChange={handleChange}
                    />
                    {errors.nominated_email && <div className="text-danger">{errors.nominated_email}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="nominated_website">Website :</label>
                <div className={Styles.formGroup_in}>
                    <input type="text" id="nominated_website" className="form-control"
                        ref={nominated_website} value={nomineeData.nominated_website} onChange={handleChange}
                    />
                    {errors.nominated_website && <div className="text-danger">{errors.nominated_website}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="nominated_occupation">Occupation :</label>
                <div className={Styles.formGroup_in}>
                    <input type="text" id="nominated_occupation" className="form-control"
                        ref={nominated_occupation} value={nomineeData.nominated_occupation} onChange={handleChange}
                    />
                    {errors.nominated_occupation && <div className="text-danger">{errors.nominated_occupation}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="award_reason">Tell us about the nominee :</label>
                <div className={Styles.formGroup_in}>
                    <textarea id="award_reason" className="form-control"
                        cols={20} rows={10}
                        ref={award_reason} value={nomineeData.award_reason} onChange={handleChange}
                    ></textarea>
                    {errors.award_reason && <div className="text-danger">{errors.award_reason}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="nominee_achievements">Give a brief description of the nominee's achievements : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <textarea id="nominee_achievements" className="form-control"
                        cols={20} rows={10}
                        ref={nominee_achievements} value={nomineeData.nominee_achievements} onChange={handleChange}
                    ></textarea>
                    {errors.nominee_achievements && <div className="text-danger">{errors.nominee_achievements}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="community_involvement">Tell us about the nominee's community involvement : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <textarea id="community_involvement" className="form-control"
                        cols={20} rows={10}
                        ref={community_involvement} value={nomineeData.community_involvement} onChange={handleChange}
                    ></textarea>
                    {errors.community_involvement && <div className="text-danger">{errors.community_involvement}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="leadership_experience">Tell us about the nominee's leadership abilities and experience : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <textarea id="leadership_experience" className="form-control"
                        cols={20} rows={10}
                        ref={leadership_experience} value={nomineeData.leadership_experience} onChange={handleChange}
                    ></textarea>
                    {errors.leadership_experience && <div className="text-danger">{errors.leadership_experience}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="other_category">Would you nominate this individual for any other category? :</label>
                <div className={Styles.formGroup_in}>
                    <select name="other_category" id="other_category" className="form-control" onChange={handleChange} ref={other_category} value={nomineeData.other_category}>
                        <option value="">--select--</option>
                        {category?.split('#@#').map((value, key) => {
                            const [name, description] = value.split('|');
                            return(
                                <option key={name} value={name}>{name}</option>
                            )
                        })}
                    </select>
                    {errors.other_category && <div className="text-danger">{errors.other_category}</div>}

                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="why_nominated">If so why? :</label>
                <div className={Styles.formGroup_in}>
                    <textarea id="why_nominated" className="form-control"
                        cols={20} rows={10}
                        ref={why_nominated} value={nomineeData.why_nominated} onChange={handleChange}
                    ></textarea>
                    {errors.why_nominated && <div className="text-danger">{errors.why_nominated}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="bio">In summary, tell us why the nominee should be awarded in this category and what makes him/her unique and outstanding. (Limit 200 words) :</label>
                <div className={Styles.formGroup_in}>
                    <textarea id="bio" className="form-control"
                        cols={20} rows={10}
                        ref={bio} value={nomineeData.bio} onChange={handleChange}
                    ></textarea>
                    {errors.bio && <div className="text-danger">{errors.bio}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="nominee_association">What is your association with the nominee ? (Limit 200 words) : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <textarea id="nominee_association" className="form-control"
                        cols={20} rows={10}
                        ref={nominee_association} value={nomineeData.nominee_association} onChange={handleChange}
                    ></textarea>
                    {errors.nominee_association && <div className="text-danger">{errors.nominee_association}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="nominated_year">Is this nominee aware they have been nominated? : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <input type="text" id="nominated_year" className="form-control"
                        ref={nominated_year} value={nomineeData.nominated_year} onChange={handleChange}
                    />
                    {errors.nominated_year && <div className="text-danger">{errors.nominated_year}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="userName">Your Name : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <input type="text" id="userName" className="form-control"
                        ref={userName} value={nomineeData.userName} onChange={handleChange}
                    />
                    {errors.userName && <div className="text-danger">{errors.userName}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="userEmail">Your Email : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <input type="email" id="userEmail" className="form-control"
                        ref={userEmail} value={nomineeData.userEmail} onChange={handleChange}
                    />
                    {errors.userEmail && <div className="text-danger">{errors.userEmail}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="userPhone">Your Phone : <span>*</span></label>
                <div className={Styles.formGroup_in}>
                    <input type="number" id="userPhone" className="form-control"
                        ref={userPhone} value={nomineeData.userPhone} onChange={handleChange}
                    />
                    {errors.userPhone && <div className="text-danger">{errors.userPhone}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="userWebsite">Website :</label>
                <div className={Styles.formGroup_in}>
                    <input type="text" id="userWebsite" className="form-control"
                        ref={userWebsite} value={nomineeData.userWebsite} onChange={handleChange}
                    />
                    {errors.userWebsite && <div className="text-danger">{errors.userWebsite}</div>}
                </div>
            </div>
            <div className={Styles.formGroup}>
                <label htmlFor="userAddress">Address :</label>
                <div className={Styles.formGroup_in}>
                    <input type="text" id="userAddress" className="form-control"
                        ref={userAddress} value={nomineeData.userAddress} onChange={handleChange}
                    />
                    {errors.userAddress && <div className="text-danger">{errors.userAddress}</div>}
                </div>
            </div>
            <div className={Styles.buttonGroup}>
                <input type="reset" value="Reset" onClick={resetForm} disabled={isSubmit} />
                <input
                    type="submit"
                    value={isSubmit ? "Submitting..." : "Submit"}
                    className={Styles.submitBtn}
                    disabled={isSubmit}
                />
            </div>
        </form>
        {isSubmit && (
            <Alert variant="warning" className="mt-4">Submitting your message...</Alert>
        )}
        {statusMessage && !isSubmit && (
            <Alert
                variant={
                    statusMessage.toLowerCase().includes("success") ? "success" :
                    statusMessage.toLowerCase().includes("error") || statusMessage.toLowerCase().includes("network") ? "danger" :
                    "warning"
                }
                className="mt-4"
            >
            {statusMessage}
            </Alert>
        )}
    </div>
  )
}

export default NominateForm
