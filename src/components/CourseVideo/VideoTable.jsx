import React from "react";

const VideoTable = ({ videos }) => {
  return (
    <div className="table-responsive mt-4">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Video Title</th>
            <th>Description</th>
            <th>Uploaded Video</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{video.title}</td>
              <td>{video.description}</td>
              <td>{video.date}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2">View</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
          {videos.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No videos uploaded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VideoTable;
