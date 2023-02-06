import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { storage } from "../config/firebase.config";
import { useStateValue } from "../Context/StateProvider";
import FilterButton from "./FilterButton";
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../api";

import { actionType } from "../Context/reducer";
import { filterByLanguage, filters } from "../utils/supportfunctions";

const DashboardNewSongs = () => {
  const [songName, setsongName] = useState("");
  const [SongImageCover, setSongImageCover] = useState(null);
  const [imageUploadProgress, setimageUploadProgress] = useState(0);
  const [isImageLoading, setisImageLoading] = useState(false);
  const [audioImagecover, setaudioImagecover] = useState(null);
  const [audioUploadingProgress, setaudioUploadingProgress] = useState(0);
  const [isAudioLoading, setisAudioLoading] = useState(false);

  const [artistImageCover, setartistImageCover] = useState(null);
  const [artistUploadingProgress, setartistUploadingProgress] = useState(0);
  const [isArtistUploading, setisArtistUploading] = useState(false);
  const [artistName, setartistName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [albumImageCover, setalbumImageCover] = useState(null);
  const [albumUploadingProgress, setalbumUploadingProgress] = useState(0);
  const [isAlbumUploading, setisAlbumUploading] = useState(false);
  const [albumName, setalbumName] = useState("");
  const [
    {
      allArtists,
      allSongs,
      allAlbums,
      artistFilter,
      albumFilter,
      filterTerm,
      languageFilter,
    },
    dispath,
  ] = useStateValue();

  useEffect(() => {
    if (!allArtists) {
      getAllArtist().then((data) => {
        dispath({ type: actionType.SET_ALL_ARTISTS, allArtists: data.artist });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispath({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        });
      });
    }
  });

  const deleteFileObject = (url, isImage) => {
    if (isImage) {
      setisImageLoading(true);
      setisAudioLoading(true);
      setisAlbumUploading(true);
      setisArtistUploading(true);
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setSongImageCover(null);
      setaudioImagecover(null);
      setalbumImageCover(null);
      setalbumImageCover(null);
      setartistImageCover(null);
      setisImageLoading(false);
      setisAudioLoading(false);
      setisAlbumUploading(false);
      setisArtistUploading(false);
    });

    dispath({
      type: actionType.SET_ALERT_TYPE,
      alertType: "success",
    });
    setInterval(() => {
      dispath({
        type: actionType.SET_ALERT_TYPE,
        alertType: null,
      });
    }, 5000);
  };

  const savesong = () => {
    if (!SongImageCover || !audioImagecover) {
      //throw the alert
      dispath({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setInterval(() => {
        dispath({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 5000);
    } else {
      setisImageLoading(true);
      setisAudioLoading(true);
      const data = {
        name: songName,
        imageURL: SongImageCover,
        artist: artistFilter,
        songURL: audioImagecover,
        album: albumFilter,
        language: languageFilter,
        category: filterTerm,
      };
      saveNewSong(data).then((res) => {
        getAllSongs().then((songs) => {
          dispath({
            type: actionType.SET_ALL_SONGS,
            allSongs: songs.songs,
          });
        });
      });

      dispath({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setInterval(() => {
        dispath({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 5000);

      setsongName(null);
      setisAudioLoading(false);
      setisImageLoading(false);
      setSongImageCover(null);
      setaudioImagecover(null);
      dispath({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
      dispath({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
      dispath({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      dispath({ type: actionType.SET_FILTER_TERM, filterTerm: null });
    }
  };

  const saveArtist = () => {
    if (!artistImageCover || !artistName || !twitter || !instagram) {
      //alert Msg
      dispath({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setInterval(() => {
        dispath({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 5000);
    } else {
      setisArtistUploading(true);
      const data = {
        name: artistName,
        imageURL: artistImageCover,
        twitter: twitter,
        instagram: instagram,
      };
      saveNewArtist(data).then((res) => {
        getAllArtist().then((data) => {
          dispath({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: data.artist,
          });
        });
      });

      dispath({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setInterval(() => {
        dispath({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 5000);

      setisArtistUploading(false);
      setartistImageCover(null);
      setartistName("");
      setTwitter("");
      setInstagram("");
    }
  };

  const saveAlbum = () => {
    if (!albumImageCover || !albumName) {
      dispath({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setInterval(() => {
        dispath({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 5000);
    } else {
      setisAlbumUploading(true);

      const data = {
        name: albumName,
        imageURL: albumImageCover,
      };

      saveNewAlbum(data).then(() => {
        getAllAlbums().then((data) => {
          dispath({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.album,
          });
        });
      });

      dispath({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setInterval(() => {
        dispath({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 5000);

      setisAlbumUploading(false);
      setalbumImageCover(null);
      setalbumName("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-blue-400 gap-4 rounded-md ">
      <input
        type="text"
        placeholder="Type your song name..."
        value={songName}
        onChange={(e) => setsongName(e.target.value)}
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-blue-300 bg-transparent"
      />

      <div className="flex w-full justify-between flex-wrap items-center gap-4">
        <FilterButton filterData={allArtists} flag={"Artist"} />
        <FilterButton filterData={allAlbums} flag={"Album"} />
        <FilterButton filterData={filterByLanguage} flag={"Language"} />
        <FilterButton filterData={filters} flag={"Category"} />
      </div>

      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isImageLoading && <FileLoader progress={imageUploadProgress} />}
        {!isImageLoading && (
          <>
            {!SongImageCover ? (
              <FileUploader
                updateState={setSongImageCover}
                setProgress={setimageUploadProgress}
                isLoading={setisImageLoading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={SongImageCover}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  className="absolute bottom-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileObject(SongImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Audio File Uploading */}

      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAudioLoading && <FileLoader progress={audioUploadingProgress} />}
        {!isAudioLoading && (
          <>
            {!audioImagecover ? (
              <FileUploader
                updateState={setaudioImagecover}
                setProgress={setaudioUploadingProgress}
                isLoading={setisAudioLoading}
                isImage={false}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                <audio src={audioImagecover} controls></audio>
                <button
                  type="button"
                  className="absolute bottom-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileObject(audioImagecover, false)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex items-center justify-center w-60 curpo p-4">
        {isImageLoading || isAudioLoading ? (
          <DisableButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
            onClick={savesong}
          >
            Save song
          </motion.button>
        )}
      </div>

      {/* Image uploader for artist */}
      <p className="text-xl font-semibold text-headingColor ">Artist Details</p>

      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isArtistUploading && <FileLoader progress={artistUploadingProgress} />}
        {!isArtistUploading && (
          <>
            {!artistImageCover ? (
              <FileUploader
                updateState={setartistImageCover}
                setProgress={setartistUploadingProgress}
                isLoading={setisArtistUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={artistImageCover}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  className="absolute bottom-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileObject(artistImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Artist Name */}
      <div className="flex flex-col items-center justify-center gap-4">
        <input
          type="text"
          placeholder=" Artist name..."
          value={artistName}
          onChange={(e) => setartistName(e.target.value)}
          className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-blue-300 bg-transparent"
        />

        {/* Twitter... */}
        <div className="flex items-center rounded-md p-3 border border-blue-300 w-full">
          <p className="text-base font-semibold text-gray-400">
            www.twitter.com/
          </p>
          <input
            type="text"
            placeholder="your twitter Id"
            className="w-full text-base font-semibold outline-none bg-transparent "
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>

        {/* Instagram... */}
        <div className="flex items-center rounded-md p-3 border border-blue-300 w-full">
          <p className="text-base font-semibold text-gray-400">
            www.instagram.com/
          </p>
          <input
            type="text"
            placeholder="your instagram Id"
            className="w-full text-base font-semibold outline-none bg-transparent "
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center w-60 curpo p-4">
          {isArtistUploading ? (
            <DisableButton />
          ) : (
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
              onClick={saveArtist}
            >
              Save Artist
            </motion.button>
          )}
        </div>
      </div>

      {/* Album Information  */}
      <p className="text-xl font-semibold text-headingColor ">Album Details</p>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAlbumUploading && <FileLoader progress={albumUploadingProgress} />}
        {!isAlbumUploading && (
          <>
            {!albumImageCover ? (
              <FileUploader
                updateState={setalbumImageCover}
                setProgress={setalbumUploadingProgress}
                isLoading={setisAlbumUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={albumImageCover}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  className="absolute bottom-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileObject(albumImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* Album Name */}

      <div className="flex flex-col items-center justify-center gap-4">
        <input
          type="text"
          placeholder=" Artist name..."
          value={albumName}
          onChange={(e) => setalbumName(e.target.value)}
          className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-blue-300 bg-transparent"
        />

        {/* Save Album */}
        <div className="flex items-center justify-center w-60 curpo p-4">
          {isAlbumUploading ? (
            <DisableButton />
          ) : (
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
              onClick={saveAlbum}
            >
              Save Album
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export const DisableButton = () => {
  return (
    <button
      disabled
      type="button"
      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:focus:last:ring-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800 inline-flex items-center"
    >
      <svg
        role="status"
        class="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <p className="text-xl font-semibold text-textColor ">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-700 animate-ping rounded-full flex items-center justify-center relative ">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl"></div>
      </div>
    </div>
  );
};

export const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const [{ alertType }, dispath] = useStateValue();

  const uploadfile = (e) => {
    isLoading(true);
    const uploadfile = e.target.files[0];
    console.log(uploadfile);
    const storageRef = ref(
      storage,
      `${isImage ? "Image" : "audio"}/${Date.now()}-${uploadfile.name}`
    );

    const uploadTask = uploadBytesResumable(storageRef, uploadfile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispath({
          type: actionType.SET_ALERT_TYPE,
          alertType: "danger",
        });
        setInterval(() => {
          dispath({
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          });
        }, 5000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });
        dispath({
          type: actionType.SET_ALERT_TYPE,
          alertType: "success",
        });
        setInterval(() => {
          dispath({
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          });
        }, 5000);
      }
    );
  };
  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            click to upload {isImage ? "an image" : "an audio"}{" "}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="Upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className={"w-0 h-0"}
        onChange={uploadfile}
      />
    </label>
  );
};

export default DashboardNewSongs;
