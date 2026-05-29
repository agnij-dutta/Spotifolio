/**
 * Visually-hidden, crawler-facing semantic content. Rendered on every device variant
 * (desktop app and the phone landing screen) so search engines — including Google's
 * mobile-first crawler — always get the full content and the deep-link anchor targets
 * (#ai-projects, #contact, …) that the sitemap points at.
 */
export function SeoContent() {
  return (
    <section className="sr-only" aria-label="Portfolio introduction">
      <h1>Agnij Dutta | Full-stack Developer &amp; Blockchain Engineer</h1>
      <p>
        Agnij Dutta is a full-stack developer and blockchain engineer from Kolkata, India.
        Currently pursuing a Bachelor's degree in Data Science and AI Applications at the
        <a href="https://www.iitm.ac.in" rel="noopener noreferrer" target="_blank"> Indian Institute of Technology Madras</a> (IIT Madras). Building human-centered software
        solutions at <a href="https://workwise.io" rel="noopener noreferrer" target="_blank">Workwise</a> as an SDE Intern and contributing to community growth at
        <a href="https://hackquest.io" rel="noopener noreferrer" target="_blank"> HackQuest</a> as a Developer Advocate. Specializes in <a href="https://react.dev" rel="noopener noreferrer" target="_blank">React</a>, <a href="https://nextjs.org" rel="noopener noreferrer" target="_blank">Next.js</a>, <a href="https://www.typescriptlang.org" rel="noopener noreferrer" target="_blank">TypeScript</a>,
        blockchain protocols, smart contracts, machine learning, and data science. Connect on <a href="https://linkedin.com/in/agnij-dutta" rel="noopener noreferrer" target="_blank">LinkedIn</a> or <a href="https://github.com/agnij-dutta" rel="noopener noreferrer" target="_blank">GitHub</a>.
      </p>
      <h2 id="work-experience">Professional Experience</h2>
      <ul>
        <li><a href="https://workwise.io" rel="noopener noreferrer" target="_blank">SDE Intern at Workwise</a> - Built features to boost admin productivity by 85%</li>
        <li><a href="https://hackquest.io" rel="noopener noreferrer" target="_blank">Developer Advocate at HackQuest</a> - Community growth and maintenance</li>
        <li>Data Science Intern at Project Control &amp; Systems - Increased customer retention by 20%</li>
      </ul>
      <h2 id="education">Education</h2>
      <p>
        Bachelor's in Data Science and AI Applications at <a href="https://www.iitm.ac.in" rel="noopener noreferrer" target="_blank">Indian Institute of Technology Madras</a>. Major in <a href="https://www.iitm.ac.in/ds" rel="noopener noreferrer" target="_blank">Data Science</a>, Minor in <a href="https://www.iitm.ac.in/ml" rel="noopener noreferrer" target="_blank">Machine Learning</a>.
      </p>
      <h2 id="skills">Technical Skills</h2>
      <ul>
        <li>Frontend: <a href="https://react.dev" rel="noopener noreferrer" target="_blank">React</a>, <a href="https://nextjs.org" rel="noopener noreferrer" target="_blank">Next.js</a>, <a href="https://www.typescriptlang.org" rel="noopener noreferrer" target="_blank">TypeScript</a>, JavaScript, HTML, CSS, Tailwind CSS</li>
        <li>Backend: <a href="https://nodejs.org" rel="noopener noreferrer" target="_blank">Node.js</a>, Express, REST APIs, GraphQL</li>
        <li>Blockchain: <a href="https://soliditylang.org" rel="noopener noreferrer" target="_blank">Solidity</a>, Smart Contracts, <a href="https://web3js.org" rel="noopener noreferrer" target="_blank">Web3</a>, <a href="https://ethereum.org" rel="noopener noreferrer" target="_blank">Ethereum</a>, Rust, Move</li>
        <li>Data Science &amp; ML: <a href="https://www.python.org" rel="noopener noreferrer" target="_blank">Python</a>, <a href="https://www.tensorflow.org" rel="noopener noreferrer" target="_blank">TensorFlow</a>, <a href="https://pytorch.org" rel="noopener noreferrer" target="_blank">PyTorch</a>, OpenCV, R, Data Analysis</li>
        <li>Tools: <a href="https://git-scm.com" rel="noopener noreferrer" target="_blank">Git</a>, <a href="https://github.com/agnij-dutta" rel="noopener noreferrer" target="_blank">GitHub</a>, <a href="https://www.docker.com" rel="noopener noreferrer" target="_blank">Docker</a>, Linux, VS Code</li>
      </ul>
      <h2>Projects</h2>
      <p>
        Explore <a href="#ai-projects">AI projects</a>, <a href="#web-projects">web applications</a>, and <a href="#blockchain-projects">blockchain solutions</a>. Portfolio includes
        machine learning models, full-stack web applications, and decentralized applications
        built with modern technologies. View projects on <a href="https://github.com/agnij-dutta" rel="noopener noreferrer" target="_blank">GitHub</a>.
      </p>
      <h3 id="ai-projects">AI &amp; Machine Learning Projects</h3>
      <p>
        Machine learning, computer vision, and applied AI work — including model experimentation,
        inference pipelines, and data-driven products. See latest AI repositories on <a href="https://github.com/agnij-dutta?tab=repositories" rel="noopener noreferrer" target="_blank">GitHub</a>.
      </p>
      <h3 id="web-projects">Web Projects</h3>
      <p>
        Full-stack web applications built with Next.js, React, and TypeScript — covering product
        UIs, dashboards, and developer tools.
      </p>
      <h3 id="blockchain-projects">Blockchain Projects</h3>
      <p>
        Smart contracts, on-chain protocols, and Web3 tooling using Solidity, Rust, and Move
        across Ethereum and EVM-compatible chains.
      </p>
      <h2 id="library">Your Library</h2>
      <p>
        Curated collection of projects, repositories, and experiments — the full library view of
        everything Agnij has built.
      </p>
      <h2 id="achievements">Achievements</h2>
      <p>
        Hackathon wins, certifications, and notable open-source contributions. View the full
        <a href="https://github.com/agnij-dutta" rel="noopener noreferrer" target="_blank"> GitHub profile</a> for additional context.
      </p>
      <h2 id="contact">Contact</h2>
      <p>
        Reach Agnij Dutta via email at <a href="mailto:agnijdutta413@gmail.com">agnijdutta413@gmail.com</a>,
        on <a href="https://linkedin.com/in/agnij-dutta" rel="noopener noreferrer" target="_blank">LinkedIn</a>,
        <a href="https://x.com/0xholmesdev" rel="noopener noreferrer" target="_blank"> X/Twitter</a>, or
        <a href="https://github.com/agnij-dutta" rel="noopener noreferrer" target="_blank"> GitHub</a>.
      </p>
      <nav aria-label="Portfolio sections">
        <ul>
          <li><a href="#education">Education</a></li>
          <li><a href="#work-experience">Work Experience</a></li>
          <li><a href="#ai-projects">AI Projects</a></li>
          <li><a href="#web-projects">Web Projects</a></li>
          <li><a href="#blockchain-projects">Blockchain Projects</a></li>
          <li><a href="#skills">Skills &amp; Tools</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </section>
  )
}
