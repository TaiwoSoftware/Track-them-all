'use client'
import {BiLogoLinkedin} from 'react-icons/bi'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { getSingleApplicant } from '@/backend/actions/applications.actions';
import { getSingleApplicant, getSingleJob } from '@/backend/actions/job.actions';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import convertToStandardDate from '@/lib/utils';



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
interface ApplicantInfoProp{
  resume?:string;
  coverletter?:string;
  attachments?:string;
  NotesAndFeedback?:string;
  passport?:string;
  mobile?:string;
  linkedin?:string;
  name?:string;
  email?:string;
}

export default function Page({ params }: { params: { id: string,jobId:string; } }) {
  // const router = useRouter()

  const [value, setValue] = useState(0);
  const [applicant,setApplicant] = useState<any>()
  const [job,setJob] = useState<any>()
  console.log("me",params?.jobId)

  useEffect(()=>{
console.log("firing")
const fetchData = async () => {
  try {
    // const jobId = params?.id;
    const res = await getSingleApplicant({ applicantId: params?.id ,jobId:params?.jobId });
    const res2 = await getSingleJob({ jobId:params?.jobId });
    setJob(res2)
    // setApplicant(res?.applications);
    // console.log("applicant", applicant);
    return res
  } catch (error) {
    console.error("Error fetching single job:", error);
  }
};

fetchData().then((a)=>{
    setApplicant(a)

});



  },[params?.id])

  // useEffect(() => {
  //   console.log("firing")
  //   const fetchData = async () => {
  //     try {
  //       const applicantId = params?.id;
  //       const res = await getSingleApplicant({ applicantId: params?.id });
  //       // console.log("applicant", res);
  //       return res;
  //     } catch (error) {
  //       console.error("Error fetching single job:", error);
  //     }
  //   };
  
  //   const fetchDataAndSetApplicant = async () => {
  //     const result = await fetchData();
  //     setApplicant(result);
  //   };
  
  //   fetchDataAndSetApplicant();
  //   console.log(applicant)
  // }, [params?.id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="applicantInfoBg w-full min-h-screen p-2 gap-2 flex flex-col">
            <div className="w-full flex items-center justify-between">
              <div className='color98 font-[400] text-[22px]'>Applicant</div>
              <div className="flex flex-row gap-1 items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 11L21.2 2.80005" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6.8V2H17.2" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <span className='font-[400] text-[16px]'>
                  Export
                </span>
              </div>
            </div>


            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-row justify-between items-center w-full'>
                  <div className='flex flex-row gap-2 items-start justify-center'>
                    <div className='flex items-start justify-start'>
                        <img className='h-[80px] w-[80px] rounded-full' alt='profile-img' src='http://res.cloudinary.com/dm7gmrkki/image/upload/v1699822046/dc4fumkfrhy2ssjzzdje.png'/>
                    </div>
                    <div className='flex flex-col items-start text-left justify-start'>
                        <div className='flex items-center gap-2'>
                          <h1 className='text-[22px] font-[400] '>{applicant?.name} </h1><span className='applicantTagColor px-2 rounded-[30px] text-[14px] font-[400] py-1'>Applied</span>
                        </div>
                        <h3 className='candidateExperienceColor text-[16px] font-[400] '>{applicant?.email}</h3>
                        <div className='flex items-center justify-center gap-4 mt-2'>
                        <span>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.97 17.33C20.97 17.69 20.89 18.06 20.72 18.42C20.55 18.78 20.33 19.12 20.04 19.44C19.55 19.98 19.01 20.37 18.4 20.62C17.8 20.87 17.15 21 16.45 21C15.43 21 14.34 20.76 13.19 20.27C12.04 19.78 10.89 19.12 9.75 18.29C8.6 17.45 7.51 16.52 6.47 15.49C5.44 14.45 4.51 13.36 3.68 12.22C2.86 11.08 2.2 9.94 1.72 8.81C1.24 7.67 1 6.58 1 5.54C1 4.86 1.12 4.21 1.36 3.61C1.6 3 1.98 2.44 2.51 1.94C3.15 1.31 3.85 1 4.59 1C4.87 1 5.15 1.06 5.4 1.18C5.66 1.3 5.89 1.48 6.07 1.74L8.39 5.01C8.57 5.26 8.7 5.49 8.79 5.71C8.88 5.92 8.93 6.13 8.93 6.32C8.93 6.56 8.86 6.8 8.72 7.03C8.59 7.26 8.4 7.5 8.16 7.74L7.4 8.53C7.29 8.64 7.24 8.77 7.24 8.93C7.24 9.01 7.25 9.08 7.27 9.16C7.3 9.24 7.33 9.3 7.35 9.36C7.53 9.69 7.84 10.12 8.28 10.64C8.73 11.16 9.21 11.69 9.73 12.22C10.27 12.75 10.79 13.24 11.32 13.69C11.84 14.13 12.27 14.43 12.61 14.61C12.66 14.63 12.72 14.66 12.79 14.69C12.87 14.72 12.95 14.73 13.04 14.73C13.21 14.73 13.34 14.67 13.45 14.56L14.21 13.81C14.46 13.56 14.7 13.37 14.93 13.25C15.16 13.11 15.39 13.04 15.64 13.04C15.83 13.04 16.03 13.08 16.25 13.17C16.47 13.26 16.7 13.39 16.95 13.56L20.26 15.91C20.52 16.09 20.7 16.3 20.81 16.55C20.91 16.8 20.97 17.05 20.97 17.33Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10"/>
                        </svg>
                        </span>
                        <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </span>
                        <span>
                            <BiLogoLinkedin size={25}/>
                        </span>
                    </div>
                    </div>
                </div>

                <div className='flex flex-col items-center gap-2'>
                  <div className='flex flex-row items-start gap-4'>
                    <span className='reject font-[400] text-[16px]'>Reject</span>
                    <span className='scheduleInterview font-[400] text-[16px]'>Schedule Interview</span>
                  </div>
                  <div className='flex items-center justify-center gap-2'>
                    <span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4475 5.07001L13.92 15.2175C13.74 15.975 13.065 16.5 12.285 16.5H2.42998C1.29748 16.5 0.487487 15.39 0.824987 14.3025L3.98248 4.16254C4.19998 3.45754 4.85249 2.96997 5.58749 2.96997H14.8125C15.525 2.96997 16.1175 3.40497 16.365 4.00497C16.5075 4.32747 16.5375 4.69501 16.4475 5.07001Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10"/>
                    <path d="M12 16.5H15.585C16.5525 16.5 17.31 15.6825 17.2425 14.715L16.5 4.5" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.26001 4.78488L8.04002 1.54492" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.285 4.79257L12.99 1.5376" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.77502 9H11.775" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.02502 12H11.025" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    </span>
                    <span className='text-[14px] font-[400]'>
                      <span className='color98'>Applied: </span>{convertToStandardDate(applicant?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>


            </div>
              <div className='underline w-full mt-2'></div>
              <div className='flex flex-row items-center justify-start gap-4 w-full'>
                  <div className='flex items-center justify-center gap-1'>
                    <span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.99999 22H16C20.02 22 20.74 20.39 20.95 18.43L21.7 10.43C21.97 7.99 21.27 6 17 6H6.99999C2.72999 6 2.02999 7.99 2.29999 10.43L3.04999 18.43C3.25999 20.39 3.97999 22 7.99999 22Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 6V5.2C8 3.43 8 2 11.2 2H12.8C16 2 16 3.43 16 5.2V6" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 13V14C14 14.01 14 14.01 14 14.02C14 15.11 13.99 16 12 16C10.02 16 10 15.12 10 14.03V13C10 12 10 12 11 12H13C14 12 14 12 14 13Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21.65 11C19.34 12.68 16.7 13.68 14 14.02" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.62 11.27C4.87 12.81 7.41 13.74 10 14.03" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className='text-[13px] font-[400]'>
                        {job?.jobTitle}
                    </span>
                  </div>
                  <div className='flex items-center justify-center gap-1'>
                    <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13.4299C13.7231 13.4299 15.12 12.0331 15.12 10.3099C15.12 8.58681 13.7231 7.18994 12 7.18994C10.2769 7.18994 8.88 8.58681 8.88 10.3099C8.88 12.0331 10.2769 13.4299 12 13.4299Z" stroke="#292D32" strokeWidth="1.5"/>
                    <path d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z" stroke="#292D32" strokeWidth="1.5"/>
                    </svg>
                    </span>
                    <span className='text-[13px] font-[400]'>
                        {job?.jobType}
                    </span>
                  </div>
                  <div className='flex items-center justify-center gap-1'>
                    <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </span>
                    <span className='text-[13px] font-[400] lowercase'>
                        {job?.employmentStatus}
                    </span>
                  </div>
              </div>
              <div className='underline w-full'></div>

              <div className='px-5'>
                <h1 className='color98 text-[20px] font-[400]'>About</h1>
                <p className='text-[16px] font-[400]'>{job?.jobDescription}</p>
              </div>



              <section>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab className='text-[16px] font-[400]' label="Cover Letter" {...a11yProps(0)} />
                      <Tab className='text-[16px] font-[400]' label="Resume" {...a11yProps(1)} />
                      <Tab className='text-[16px] font-[400]' label="Attachments" {...a11yProps(2)} />
                      <Tab className='text-[16px] font-[400]' label="Notes/FeedBack" {...a11yProps(3)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>  
                  <object
                    data={applicant?.coverletter}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  ></object>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                  <object
                    data={applicant?.resume}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  ></object>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    <div className='flex items-center justify-start'>
                    <a href='https://www.google.com' className='linkBlue text-[16px] font-[400]' target='_blank' rel='noopener noreferrer'>
                      {applicant?.portfolioworksample}
                    </a>
                      <span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 13.4V16.4C17 20.4 15.4 22 11.4 22H7.6C3.6 22 2 20.4 2 16.4V12.6C2 8.6 3.6 7 7.6 7H10.6" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.0001 13.4H13.8001C11.4001 13.4 10.6001 12.6 10.6001 10.2V7L17.0001 13.4Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.6001 2H15.6001" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 5C7 3.34 8.34 2 10 2H12.62" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21.9999 8V14.19C21.9999 15.74 20.7399 17 19.1899 17" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 8H19C16.75 8 16 7.25 16 5V2L22 8Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      </span>
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={3}>
                    <div className='w-full '>
                      <form className='flex flex-col items-end gap-2'>
                        <textarea className='bgColorF8 w-full h-[5rem] p-1' rows={4} cols={50} placeholder="Write a note or feedback here..."></textarea>
                        <button type='submit' className='px-2 py-1 rounded-[4px] bgColorF8 flex '>Send</button>
                      </form>


                      
                      <div className='flex flex-row gap-2 items-start justify-center'>
                        <div className='flex items-start justify-start'>
                            <img className='h-[42px] w-[42px] rounded-full' alt='profile-img' src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600'/>
                        </div>
                        <div className='flex flex-col items-start text-left justify-start'>
                            <div className='flex items-center gap-2'>
                              <h1 className='text-[16px] font-[400] '>Neel DeshMukh </h1>
                            </div>
                            <p className=' text-[14px] font-[400] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis consequatur, consequuntur aspernatur perspiciatis non. Itaque error ea dicta obcaecati.</p>
                        </div>
                    </div>
                      
                    </div>
                  </CustomTabPanel>
                </Box>
              </section>
    </div>
  )
}



  
















