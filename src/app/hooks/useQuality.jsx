import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import qulityService from "../services/quality.servise";
import { toast } from "react-toastify";

export const QualitiesContex = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContex);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoadig] = useState(true);
  useEffect(() => {
    getQualities();
  }, []);

  const getQualities = async () => {
    try {
      const { content } = await qulityService.get();
      setQualities(content);
      setLoadig(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    console.log(error);
    setError(message);
  }

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    };
  }, [error]);

  return (
    <QualitiesContex.Provider value={{ qualities, getQuality, isLoading }}>
      {!isLoading ? children : <h1>Qualities loading...</h1>}
    </QualitiesContex.Provider>
  );
};

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
