const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a')];

function closeMenu() {
  if (!nav || !menuToggle) return;
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
  nav?.classList.toggle('open');
});

navLinks.forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

let scale = Number(localStorage.getItem('fontScale')) || 1;
const applyScale = () => {
  document.documentElement.style.setProperty('--font-scale', scale.toFixed(2));
  localStorage.setItem('fontScale', scale.toFixed(2));
};
applyScale();

document.querySelector('#font-up')?.addEventListener('click', () => {
  scale = Math.min(1.2, scale + 0.05);
  applyScale();
});

document.querySelector('#font-down')?.addEventListener('click', () => {
  scale = Math.max(0.9, scale - 0.05);
  applyScale();
});

document.querySelector('#font-reset')?.addEventListener('click', () => {
  scale = 1;
  applyScale();
});

const needs = {
  dor: {
    title: 'Dor',
    intro: 'A dor é uma experiência individual e deve ser avaliada de forma sistemática. Descrever como ela afeta sono, movimento, humor e atividades ajuda a equipe a ajustar o cuidado.',
    observe: ['Intensidade, localização e duração.', 'Fatores de melhora ou piora.', 'Impacto no sono, mobilidade e rotina.'],
    seek: ['Dor nova, intensa ou em rápida piora.', 'Dor associada a queda, fraqueza súbita ou alteração de consciência.', 'Dor que permanece descontrolada apesar do plano atual.'],
    discuss: ['Reavaliação da causa e dos medicamentos.', 'Posicionamento, calor ou frio quando orientados.', 'Relaxamento, respiração, musicoterapia ou acupuntura, conforme segurança e preferência.']
  },
  ansiedade: {
    title: 'Ansiedade',
    intro: 'Medo e ansiedade podem aumentar diante da incerteza, de sintomas físicos e de decisões difíceis. Informação clara e escuta qualificada fazem parte do cuidado.',
    observe: ['Situações que desencadeiam piora.', 'Relação com dor, falta de ar ou insônia.', 'Impacto na alimentação, sono e decisões.'],
    seek: ['Crise intensa, confusão ou risco de autoagressão.', 'Sofrimento persistente que impede atividades básicas.', 'Ansiedade associada a falta de ar ou dor não controlada.'],
    discuss: ['Apoio psicológico e comunicação estruturada.', 'Técnicas de respiração e relaxamento.', 'Meditação, musicoterapia ou arteterapia adaptadas à pessoa.']
  },
  fadiga: {
    title: 'Fadiga',
    intro: 'Fadiga é mais do que cansaço comum. Pode ter causas clínicas, emocionais e relacionadas ao tratamento, por isso precisa ser contextualizada.',
    observe: ['Horários e atividades de maior desgaste.', 'Qualidade do sono e ingestão de alimentos.', 'Mudanças recentes em medicamentos ou sintomas.'],
    seek: ['Piora súbita, desmaio ou falta de ar importante.', 'Incapacidade nova para levantar ou realizar autocuidado.', 'Fadiga acompanhada de sangramento ou febre.'],
    discuss: ['Investigação de causas reversíveis.', 'Conservação de energia e definição de prioridades.', 'Atividade adaptada, práticas corporais suaves ou relaxamento, quando apropriados.']
  },
  dispneia: {
    title: 'Falta de ar',
    intro: 'A sensação de falta de ar pode gerar medo e exige avaliação do contexto. Medidas de conforto não substituem investigação quando o sintoma é novo ou piora rapidamente.',
    observe: ['Início, duração e atividades desencadeantes.', 'Presença de tosse, dor, febre ou chiado.', 'Capacidade de falar, caminhar e repousar.'],
    seek: ['Piora súbita ou dificuldade intensa para respirar.', 'Lábios arroxeados, dor no peito ou confusão.', 'Sintoma diferente do padrão habitual.'],
    discuss: ['Avaliação clínica e revisão do plano de controle.', 'Posicionamento, ambiente ventilado e técnicas respiratórias orientadas.', 'Relaxamento ou musicoterapia como apoio ao conforto.']
  },
  nauseas: {
    title: 'Náuseas e vômitos',
    intro: 'Náuseas e vômitos podem ter várias causas e afetar alimentação, hidratação e uso de medicamentos. Registrar horários e possíveis gatilhos ajuda na avaliação.',
    observe: ['Frequência, volume e relação com refeições.', 'Medicamentos ou odores associados.', 'Sinais de desidratação e perda de peso.'],
    seek: ['Vômitos persistentes ou com sangue.', 'Incapacidade de ingerir líquidos.', 'Dor abdominal intensa, distensão ou confusão.'],
    discuss: ['Identificação da causa e ajuste de medicamentos.', 'Organização de refeições e hidratação conforme orientação.', 'Acupuntura ou técnicas de relaxamento quando adequadas.']
  },
  sono: {
    title: 'Sono',
    intro: 'Alterações do sono podem estar ligadas a dor, ansiedade, medicamentos, ambiente e rotina. Tratar apenas a insônia sem avaliar essas causas pode ser insuficiente.',
    observe: ['Horário de dormir e despertares.', 'Dor, falta de ar ou pensamentos recorrentes.', 'Sono durante o dia e uso de estimulantes.'],
    seek: ['Insônia acompanhada de confusão ou agitação intensa.', 'Sonolência excessiva nova.', 'Quedas ou dificuldade para despertar.'],
    discuss: ['Revisão de sintomas e medicamentos.', 'Higiene do sono e ajuste do ambiente.', 'Relaxamento, meditação ou música suave, conforme preferência.']
  },
  luto: {
    title: 'Luto',
    intro: 'O luto pode começar antes da perda e não segue uma sequência única. Tristeza, raiva, culpa, alívio e saudade podem coexistir.',
    observe: ['Mudanças no sono, alimentação e isolamento.', 'Necessidade de falar, silenciar ou realizar rituais.', 'Impacto nas atividades e relações.'],
    seek: ['Risco de autoagressão ou ausência total de suporte.', 'Sofrimento intenso e persistente com grande prejuízo funcional.', 'Uso abusivo de álcool ou outras substâncias.'],
    discuss: ['Apoio psicológico, social ou comunitário.', 'Capelania ou representante religioso quando desejado.', 'Grupos de apoio, arteterapia ou musicoterapia conforme contexto.']
  }
};

const tabButtons = [...document.querySelectorAll('.need-tab')];
const needContent = document.querySelector('#need-content');

function listItems(items) {
  return items.map(item => `<li>${item}</li>`).join('');
}

function renderNeed(key, focusPanel = false) {
  const item = needs[key];
  const activeTab = tabButtons.find(button => button.dataset.need === key);
  if (!item || !needContent || !activeTab) return;

  tabButtons.forEach(button => {
    const selected = button === activeTab;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });

  needContent.setAttribute('aria-labelledby', activeTab.id);
  needContent.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.intro}</p>
    <div class="need-columns">
      <section class="need-column"><h4>O que observar</h4><ul>${listItems(item.observe)}</ul></section>
      <section class="need-column"><h4>Quando procurar avaliação</h4><ul>${listItems(item.seek)}</ul></section>
      <section class="need-column"><h4>O que discutir com a equipe</h4><ul>${listItems(item.discuss)}</ul></section>
    </div>
    <div class="need-alert"><strong>Atenção:</strong> orientações gerais não substituem avaliação individual. Em situação de urgência, procure o serviço de referência.</div>
  `;

  if (focusPanel) needContent.focus();
}

tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => renderNeed(button.dataset.need));
  button.addEventListener('keydown', event => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabButtons.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabButtons.length - 1;
    if (nextIndex !== index) {
      event.preventDefault();
      tabButtons[nextIndex].focus();
      renderNeed(tabButtons[nextIndex].dataset.need);
    }
  });
});

renderNeed('dor');

const observedSections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;

  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${visible.target.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-20% 0px -65% 0px', threshold: [0.05, 0.2, 0.5] });

observedSections.forEach(section => observer.observe(section));

const backToTop = document.querySelector('#back-to-top');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 700);
}, { passive: true });

backToTop?.addEventListener('click', () => {
  document.querySelector('#inicio')?.scrollIntoView({ behavior: 'smooth' });
});