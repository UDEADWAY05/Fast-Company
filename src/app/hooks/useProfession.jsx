import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
  const [profIsLoading, setLoading] = useState(true);
  const [professions, setProfessions] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    };
  }, [error]);
  useEffect(() => {
    getProfessionList();
  }, []);
  async function getProfessionList() {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setLoading(false);
    } catch (error) {
      errorCatchet(error);
    }
  };

  function errorCatchet(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  };
  function getProfession(id) {
    return !profIsLoading ? professions.find((p) => { return p._id === id; }) : "loading..";
  }
  return (<ProfessionContext.Provider value={{ profIsLoading, professions, getProfession }}>{children}</ProfessionContext.Provider>);
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
