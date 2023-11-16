"use server"
import { revalidatePath } from "next/cache";
import User from "../models/userModels/user.model";
import { connectToDB } from "../mongoDb/connect"
import Job from "../models/jobModel/job.model";
import mongoose from "mongoose";
import Application from "../models/applicationsModel/applications.model";
const cloudinary = require('cloudinary').v2;

import { uploadToCloudinary } from "@/lib/cloudinaryUtil";
 



cloudinary.config({
  cloud_name: 'dm7gmrkki',
  api_key: '398486115139613',
  api_secret: 'R7wAMNqAU3WCOG5eZgT_DOjBg8Y',
});
 


export async function linkedInCreateJob() {
    const url = 'https://api.linkedin.com/v2/simpleJobPostings';
    const token = 'AQUd45TTnWIHsZ1y_fHT6lLc9YOeGJjYvYoId8ezZSZQqHeNkstSyNdtnrson5-rK38qojt1pikrqvoeMyRU5_AdvOZgMt-lX5164h8alnfxbMA5KI_p9S3oL0X6VbK0fDUFuGU-zoVAN8B82C2Xx4ylQL2YBFXP-BP07boYbUcyK8iX85dB4z5jq_R4BQs7XVyTT0OxV3oZhBZKU82s8mER5FzNMTvC2OLlVKuh2NZkAKZIKvt1U7TU49r5Ca3apsIz40gdwtOusmK4AnNVCViyyOUu9ZzlCTQTONfybCUuvCFcwHYOV7PSayrjtU2E2-yRJK5H-DTr-_3JUYB3kgmXND6lSA';
  
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      "x-restli-method": "batch_create"
    };
  
    const jobData = {
      "integrationContext": "urn:li:organization:2414183",
      "companyApplyUrl": "http://linkedin.com",
      "description": "We are looking for a passionate Software Engineer to design, develop and install software solutions. Software Engineer responsibilities include gathering user requirements, defining system functionality and writing code in various languages. Our ideal candidates are familiar with the software development life cycle (SDLC) from preliminary system analysis to tests and deployment.",
      "employmentStatus": "PART_TIME",
      "externalJobPostingId": "1234",
      "listedAt": 1440716666,
      "jobPostingOperationType": "CREATE",
      "title": "Software Engineer",
      "location": "San Francisco, CA",
      "workplaceTypes": [
        "hybrid"
      ]
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(jobData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to create job: ${await response.text()}`);
      }
  
      const data = await response.json();
      // Handle the data returned from the API
      console.log(data);
    } catch (error) {
      throw new Error(`Failed to create job: ${error}`);
    }
  }
  


  interface CreateJobProp{
    userId?:string | undefined;
    jobTitle?:string | undefined;
    jobDescription?:string | undefined;
    teamDept?:string | undefined;
    location?:string | undefined;
    jobType?:string | undefined;
    yrsOfExp?:string | undefined;
    companyOverview?:string | undefined;
    qualifications?:string | undefined;
    deadline?:any;
    integrationContext?:string | undefined;
    companyApplyUrl?:string | undefined;
    employmentStatus?:string | undefined;
    externalJobPostingId?:string | undefined;
    listedAt?:string | undefined;
    jobPostingOperationType?:string | undefined;
    workplaceTypes?:string | undefined;
    name?: boolean | undefined;
    email?: boolean | undefined;
    mobile?: boolean | undefined;
    linkedin?: boolean | undefined;
    portfolioworksample?: boolean | undefined;
  }


  export async function createJob({
    userId,
    jobTitle,
    jobDescription,
    teamDept,
    location,
    jobType,
    yrsOfExp,
    companyOverview,
    qualifications,
    deadline,
    integrationContext,
    companyApplyUrl,
    employmentStatus,
    externalJobPostingId,
    listedAt,
    jobPostingOperationType,
    workplaceTypes,
    name,
    email,
    mobile,
    linkedin,
    portfolioworksample,
  }:CreateJobProp):Promise<void>{

    connectToDB()

    try {
      // Find the job by their userId   
      const user = await User.findOne({ id:userId });
  
      if (!user) {
        throw new Error(`User not found with id: ${userId}`);
      }
  
      // Create a new Job
      const createdJob = await Job.create({
        author: user._id, // Associate the book with the user
        jobTitle:jobTitle,
        jobDescription:jobDescription,
        teamDept:teamDept,
        location:location,
        jobType:jobType,
        yrsOfExp:yrsOfExp,
        companyOverview:companyOverview,
        qualifications:qualifications,
        deadline:deadline,
        applicationRequirement:{
          name:name,
          email:email,
          mobile:mobile,
          linkedin:linkedin,
          portfolioworksample:portfolioworksample,
        },
        // coverPhoto:coverPhoto,
        integrationContext:"urn:li:organization:2414183",
        companyApplyUrl:"www.google.com",
        employmentStatus:"FULL_TIME" ,//{type:String,enum:["PART_TIME","FULL_TIME"]}
        externalJobPostingId:"1234", //"1234" 
        listedAt:12354322,   //1440716666
        jobPostingOperationType: "CREATE", //{ type:String, default:"CREATE"}
        workplaceTypes:"remote",  //{type:String, enum: ["hybrid","remote","On-site"]}
      });
  
      if (createdJob) {
        // Update the user's 'postedJob' field to include the jobs's ID
        user.postedJobs.push(createdJob._id.toString());
  
        // Save the updated user
        await user.save();
      }
    } catch (error: any) {
      throw new Error(`Failed to create Job: ${error.message}`);
    }


  }



  
export async function getAllPostedJobs(){
  connectToDB()
  try {
    // .populate("author")
  const res = await Job.find({})
  const jobs = JSON.parse(JSON.stringify(res))
  console.log("jobs",jobs)
  return jobs

} catch (error:any) {
  console.log(`there was an error finding all jobs ${error.message}`)
}
} 



interface Params {
  applicant?:string | null | undefined;
  jobId?:string | null | undefined;
  name?:string | null | undefined;
  email?:string | null | undefined;
  mobile?:string | null | undefined;
  linkedin?:string | null | undefined;
  resume?:any;
  passport?:any;
  coverletter?:any;
  yearsofexperience?:string | undefined | null;
  portfolioworksample?:any;
  // bio?:string | null | undefined;
  // image?:string | null | undefined;
  // path?:string | null | undefined;
  // email?:string | null | undefined;
  // objectId?:string | null | undefined;
}



export async function jobApplication({
  applicant,
  jobId,
  name,
  email,
  mobile,
  linkedin,
  resume,
  portfolioworksample,
  passport,
  coverletter,
  yearsofexperience,
}: Params): Promise<void> {
  connectToDB();

  try {
    // console.log(coverletter);
    // console.log(yearsofexperience,passport,coverletter);

    const user = await User.findOne({ _id: applicant });

    // Upload all files to Cloudinary
    const [resumeRes, passportRes, coverletterRes] = await Promise.all([
      uploadToCloudinary(resume),
      uploadToCloudinary(passport),
      uploadToCloudinary(coverletter),
    ]);

    const createdApplication = await Application.create({
      Applicant: applicant,
      name: name,
      email: email,
      mobile: mobile,
      linkedin: linkedin,
      resume: resumeRes?.url,
      passport: passportRes?.url,
      coverletter: coverletterRes?.url,
      yearsofexperience: yearsofexperience,
      portfolioworksample: portfolioworksample,
    });

    if (createdApplication) {
      // Update the user's 'books' field to include the book's ID
      const job = await Job.findOne({ _id: "654f451b9d9a151d64d0a5c7" });
      const c = job?.applications?.push(createdApplication?._id?.toString());
      console.log(c);

      // Save the updated user
      await job.save();
    }

    // Additional logic after application creation if needed

  } catch (error: any) {
    throw new Error(`Failed to create application: ${error.message}`);
  }
}





interface ApplicantParams{
  applicantId:string;
  jobId:string;
}



export async function getSingleApplicant({ applicantId,jobId }: ApplicantParams) {
  console.log("a");
  connectToDB();

  try {
    const res = await Application.findOne({ _id: applicantId }); // Add fields you want to populate 'field1 field2'
console.log(res)
    if (!res) {
      console.log('Applicant not found');
      return {};
    }
    const applicant = JSON.parse(JSON.stringify(res))

    // const applicant = job.applications.find((app:any) => {return app._id.toString() === applicantId});

    

    // console.log('singleapplicant', applicant);

    return applicant || {};
  } catch (error) {
    console.error('Error searching in the database for applicant:', error);
    return {};
  }
}











interface JobParams {
  // userIdd?: string | null | undefined;
  jobId?: string | null | undefined;
  // coverPhoto?: string | null | undefined;
  // caption?: string | null | undefined;
}


export async function getSingleJob({jobId}:JobParams){
  connectToDB()
  try {
    const res = await Job.findOne({ _id: jobId }).populate("author").populate('applications')
    const job = JSON.parse(JSON.stringify(res))
    console.log("singlejob", job)
// const sanitizedJob = {
//   _id: job?._id,
//   name: job?.name,
//   // name: book.name,
//   // Add other properties you need
//   author: {
//     _id: job?.author._id,
//     name: job?.author.name,
//     // Add other author properties you need
//   },
// };
    return job;
  } catch (error:any) {
    console.error('Error searching in the database:', error);
    
    return {}
  }  
}