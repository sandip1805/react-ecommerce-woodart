import { Avatar, Button, Typography } from "@material-tailwind/react";
import React from "react";
import {
  MapPinIcon,
} from "@heroicons/react/24/solid";
import Container from "./Container";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative py-16 px-4">
        <Container className="flex flex-wrap lg:py-20 py-10">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/2">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                      <Avatar
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <Link to="/">
                    <Button className="bg-blue-400">Home</Button>
                  </Link>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        className="font-bold uppercase"
                      >
                        22
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal"
                      >
                        Friends
                      </Typography>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        className="font-bold uppercase"
                      >
                        10
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal"
                      >
                        Photos
                      </Typography>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <Typography
                        variant="lead"
                        className="font-bold uppercase"
                      >
                        89
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal"
                      >
                        Comments
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-8 text-center">
                <Typography variant="h2" className="mb-2">
                  Jenna Stones
                </Typography>
                <div className="mb-16 flex items-center justify-center gap-2">
                  <MapPinIcon className="-mt-px h-4 w-4" />
                  <Typography className="font-medium">
                    Los Angeles, California
                  </Typography>
                </div>
                {/* <div className="mb-2 flex items-center justify-center gap-2">
                  <Typography
                    variant="h4"
                    className="text-lg flex items-center justify-center gap-2"
                  >
                    Date of Birth -
                    <Typography variant="paragraph" className="text-sm">
                      11/10/1999
                    </Typography>
                  </Typography>
                </div> */}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Profile;
