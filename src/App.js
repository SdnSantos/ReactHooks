import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [techs, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  //useCallback - parecido com o useMemo só que retorna uma função
  //só é recriada quando uma das variáveis sofrerem alterações
  const handleAdd = useCallback(() => {
    setTech([...techs, newTech]);
    setNewTech('');
  }, [newTech, techs]);

  //useEffect - substitui os métodos de ciclo de vida
  useEffect(() => {
    const storageTech = localStorage.getItem('techs');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);

  //useMemo() - só executará quando a variável techs mudar o valor
  const techSize = useMemo(() => techs.length, [techs]);

  return (
    <>
      <br />
      <br />
      <input
        type="text"
        value={newTech}
        onChange={e => setNewTech(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
      <br />
      <br />
      <ul>
        {techs.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
    </>
  );
}

export default App;
