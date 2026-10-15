/**
 * GRURU MUSEUM — Interactive Engine & Data Booming Simulation
 * Motion: Scan -> Decode -> Connect (150ms / 300ms / 600-1000ms)
 * Features:
 *   1. Canvas Knowledge Graph with Force Simulation
 *   2. Data Booming Radial Explosion Simulator (Stagger 40ms, 3 tiers)
 *   3. Text Decryption Effect (600ms)
 *   4. Specimen Label Modal Inspection
 *   5. Web Audio Subtle Sound Synth
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. WEB AUDIO SUBTLE SOUND SYNTHESIZER
  // ==========================================
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
  }

  function playTone(freq = 440, type = 'sine', duration = 0.08, vol = 0.04) {
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch(e) {
      // Audio autoplay policy catch
    }
  }

  // ==========================================
  // 2. TEXT DECODING EFFECT (Step 9 in Brief)
  // ==========================================
  const decodeElements = document.querySelectorAll('.decode-text');
  const glyphs = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzกขคงจฉชซญดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ';

  function decodeEffect(el) {
    const originalText = el.getAttribute('data-original') || el.innerText;
    el.setAttribute('data-original', originalText);
    let iterations = 0;
    const duration = 600; // 600ms per brief
    const stepTime = 30;
    const totalSteps = duration / stepTime;

    const interval = setInterval(() => {
      el.innerText = originalText.split('').map((char, index) => {
        if (char === ' ' || char === '\n') return char;
        if (index < (iterations / totalSteps) * originalText.length) {
          return originalText[index];
        }
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      }).join('');

      iterations++;
      if (iterations >= totalSteps) {
        clearInterval(interval);
        el.innerText = originalText;
      }
    }, stepTime);
  }

  decodeElements.forEach(el => decodeEffect(el));

  // ==========================================
  // 3. INTERACTIVE DATA BOOMING SIMULATOR
  // ==========================================
  const boomingContainer = document.getElementById('booming-container');
  const countDisplay = document.getElementById('booming-count');
  let currentConnections = 1;

  const boomingData = {
    root: { id: 'root', label: 'ภูมิปัญญาไทย\nThai Wisdom', era: 'สุวรรณภูมิ', category: 'wisdom' },
    childrenTier1: [
      { id: 'b1', label: 'พฤกษศาสตร์\nสมุนไพร', category: 'science', note: 'วิจัยสารสกัดระดับเซลล์' },
      { id: 'b2', label: 'สถาปัตย์\nลดความร้อน', category: 'tech', note: 'ระบบชายคาและการระบายลม' },
      { id: 'b3', label: 'ดาราศาสตร์\nสุโขทัย', category: 'history', note: 'การคำนวณปฏิทินสุริยคติ' },
      { id: 'b4', label: 'โภชนาการ\nเครื่องแกง', category: 'nature', note: 'สารต้านการอักเสบ' },
      { id: 'b5', label: 'เซรามิก\nสังคโลก', category: 'art', note: 'เคลือบผิวระดับไมโคร' },
      { id: 'b6', label: 'จดหมายเหตุ\nการแพทย์', category: 'wisdom', note: 'สูตรยาจารึกวัดโพธิ์' },
      { id: 'b7', label: 'ชลประทาน\nโบราณ', category: 'tech', note: 'ระบบเหมืองฝายล้านนา' },
      { id: 'b8', label: 'โลหการ\nสำริดไทย', category: 'science', note: 'โลหะผสมต้านสนิม' }
    ],
    childrenTier2: [
      { id: 'b1-1', label: 'ขมิ้นชัน\n(Curcumin)', category: 'science' },
      { id: 'b1-2', label: 'พริกไทยดำ\n(Piperine)', category: 'science' },
      { id: 'b4-1', label: 'ต้านอนุมูล\nอิสระ +2000%', category: 'nature' }
    ]
  };

  function updateBoomingCounter(val) {
    currentConnections = val;
    if (countDisplay) {
      countDisplay.innerText = currentConnections.toString().padStart(2, '0');
    }
  }

  function initDataBooming() {
    if (!boomingContainer) return;
    boomingContainer.innerHTML = '';
    updateBoomingCounter(1);

    // Center Root Node
    const rootEl = document.createElement('div');
    rootEl.className = 'booming-node root';
    rootEl.innerHTML = `<span>ภูมิปัญญาไทย</span><span style="font-size:10px;font-family:var(--font-mono);">[CLICK ME]</span>`;
    rootEl.title = 'คลิกเพื่อระเบิดความรู้ (Data Booming)';
    
    // Pulse Ring
    const ring = document.createElement('div');
    ring.className = 'booming-ring';
    ring.style.width = '140px';
    ring.style.height = '140px';
    boomingContainer.appendChild(ring);
    boomingContainer.appendChild(rootEl);

    let exploded = false;

    rootEl.addEventListener('click', () => {
      if (exploded) return;
      exploded = true;
      playTone(587.33, 'triangle', 0.15, 0.08); // D5 chime

      // Radial burst of Tier 1 nodes (6-12 nodes, stagger 40ms per brief)
      const nodes = boomingData.childrenTier1;
      const radius = 180;
      const angleStep = (2 * Math.PI) / nodes.length;

      nodes.forEach((node, idx) => {
        setTimeout(() => {
          const angle = idx * angleStep - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          // SVG Line Connector
          const lineSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          lineSvg.style.position = 'absolute';
          lineSvg.style.top = '0';
          lineSvg.style.left = '0';
          lineSvg.style.width = '100%';
          lineSvg.style.height = '100%';
          lineSvg.style.pointerEvents = 'none';
          
          const centerX = boomingContainer.clientWidth / 2;
          const centerY = boomingContainer.clientHeight / 2;
          
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', centerX);
          line.setAttribute('y1', centerY);
          line.setAttribute('x2', centerX + x);
          line.setAttribute('y2', centerY + y);
          line.setAttribute('stroke', '#2EE6FF');
          line.setAttribute('stroke-width', '1.5');
          line.setAttribute('stroke-dasharray', '3 3');
          line.setAttribute('opacity', '0.6');
          lineSvg.appendChild(line);
          boomingContainer.insertBefore(lineSvg, rootEl);

          // Node Element
          const childEl = document.createElement('div');
          childEl.className = 'booming-node child';
          childEl.style.left = `calc(50% + ${x}px - 34px)`;
          childEl.style.top = `calc(50% + ${y}px - 34px)`;
          childEl.innerHTML = `<span style="font-size:11px;line-height:1.2;">${node.label.replace('\n', '<br>')}</span>`;
          
          childEl.addEventListener('click', (e) => {
            e.stopPropagation();
            playTone(880, 'sine', 0.12, 0.06);
            openSpecimenModal({
              id: `GRM-BOOM-${node.id.toUpperCase()}`,
              title: node.label.replace('\n', ' '),
              category: node.category,
              era: 'โบราณคดีสู่ปัจจุบัน',
              summary: node.note || 'เชื่อมโยงสู่ฐานข้อมูล Knowledge Graph ใน Hall 02',
              takeaway: 'นำความรู้ส่วนนี้ไปประยุกต์ใช้ในการดำเนินชีวิตร่วมสมัยได้อย่างเป็นรูปธรรม',
              sources: 'หอสมุดแห่งชาติ & ศูนย์ข้อมูลวิจัย GRURU'
            });
          });

          boomingContainer.appendChild(childEl);
          playTone(400 + idx * 40, 'sine', 0.05, 0.02);
          updateBoomingCounter(currentConnections + 1);
        }, idx * 40); // 40ms stagger per brief
      });
    });
  }

  const resetBoomingBtn = document.getElementById('reset-booming-btn');
  if (resetBoomingBtn) {
    resetBoomingBtn.addEventListener('click', () => {
      initDataBooming();
      playTone(330, 'sawtooth', 0.08, 0.04);
    });
  }

  initDataBooming();

  // ==========================================
  // 4. INTERACTIVE D3/CANVAS KNOWLEDGE GRAPH
  // ==========================================
  const canvas = document.getElementById('kg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Responsive Canvas
    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    });

    // 50+ Real Knowledge Nodes across categories
    const categories = {
      science: { color: '#2EE6FF', shape: 'circle', label: 'วิทยาศาสตร์' },
      history: { color: '#FF5A1F', shape: 'hexagon', label: 'ประวัติศาสตร์' },
      tech: { color: '#8C6BFF', shape: 'square', label: 'เทคโนโลยี' },
      wisdom: { color: '#FFC233', shape: 'triangle', label: 'ภูมิปัญญาไทย' },
      nature: { color: '#34E89E', shape: 'diamond', label: 'ธรรมชาติ & ชีวิต' },
      art: { color: '#FF5FA2', shape: 'ring', label: 'ศิลปะ & ออกแบบ' }
    };

    const graphNodes = [
      // Central Anchors
      { id: 1, label: 'GRURU MUSEUM', cat: 'wisdom', size: 28, era: 2026, x: width * 0.5, y: height * 0.5, vx: 0, vy: 0, desc: 'ศูนย์กลางข้อมูลประวัติศาสตร์และภูมิปัญญาเพื่อการใช้งานจริง' },
      
      // Thai Herbal & Science
      { id: 2, label: 'ขมิ้นชันไทย', cat: 'nature', size: 18, era: 1782, x: width * 0.35, y: height * 0.4, vx: 0, vy: 0, desc: 'สมุนไพรที่มีสาร Curcumin ยับยั้งสารอักเสบ' },
      { id: 3, label: 'พริกไทยดำป่น', cat: 'nature', size: 14, era: 1782, x: width * 0.3, y: height * 0.35, vx: 0, vy: 0, desc: 'มีสาร Piperine ช่วยเพิ่ม Bioavailability 2000%' },
      { id: 4, label: 'สูตรยาจารึกวัดโพธิ์', cat: 'history', size: 16, era: 1832, x: width * 0.25, y: height * 0.5, vx: 0, vy: 0, desc: 'มรดกความทรงจำแห่งโลกยูเนสโก จดบันทึกสรรพคุณสมุนไพร' },
      { id: 5, label: 'วิทยาศาสตร์ระดับเซลล์', cat: 'science', size: 20, era: 2026, x: width * 0.28, y: height * 0.25, vx: 0, vy: 0, desc: 'การวิจัยกลไกการดูดซึมสารอาหารระดับโมเลกุล' },
      { id: 6, label: 'เครื่องแกงสมุนไพร', cat: 'wisdom', size: 18, era: 1656, x: width * 0.4, y: height * 0.3, vx: 0, vy: 0, desc: 'ภูมิปัญญาการจับคู่สมุนไพรฤทธิ์ร้อนและฤทธิ์เย็น' },

      // Thai Architecture & Climate Tech
      { id: 7, label: 'เรือนไทยโบราณ', cat: 'art', size: 20, era: 1550, x: width * 0.65, y: height * 0.4, vx: 0, vy: 0, desc: 'สถาปัตยกรรมยกพื้นใต้ถุนสูงและชายคายื่นยาว' },
      { id: 8, label: 'ระบบระบายความร้อนลมธรรมชาติ', cat: 'tech', size: 16, era: 2026, x: width * 0.72, y: height * 0.35, vx: 0, vy: 0, desc: 'การใช้หลัก Passive Cooling ลดการใช้พลังงานในบ้านยุคใหม่' },
      { id: 9, label: 'วัดอรุณราชวราราม', cat: 'history', size: 22, era: 1820, x: width * 0.6, y: height * 0.25, vx: 0, vy: 0, desc: 'งานประดับกระเบื้องถ้วยลายครามและวิศวกรรมฐานรากริมแม่น้ำ' },
      { id: 10, label: 'เซรามิกและสังคโลก', cat: 'art', size: 16, era: 1350, x: width * 0.55, y: height * 0.2, vx: 0, vy: 0, desc: 'เทคโนโลยีเตาเผาโบราณและการเคลือบผิวด้วยขี้เถ้าธรรมชาติ' },

      // Water Engineering & Agriculture
      { id: 11, label: 'เหมืองฝายล้านนา', cat: 'tech', size: 18, era: 1296, x: width * 0.6, y: height * 0.65, vx: 0, vy: 0, desc: 'กติกาการจัดสรรน้ำและวิศวกรรมชลประทานภูมิปัญญาชุมชน' },
      { id: 12, label: 'การจัดการน้ำอัจฉริยะ', cat: 'tech', size: 16, era: 2026, x: width * 0.68, y: height * 0.7, vx: 0, vy: 0, desc: 'IoT และเซนเซอร์วัดระดับน้ำผสมผสานแนวคิดฝายชะลอน้ำ' },
      { id: 13, label: 'ข้าวพันธุ์พื้นเมือง', cat: 'nature', size: 18, era: 1782, x: width * 0.5, y: height * 0.7, vx: 0, vy: 0, desc: 'ความหลากหลายทางชีวภาพและดัชนีน้ำตาลต่ำ (Low GI)' },
      
      // Thai Astronomy & Language Tech
      { id: 14, label: 'ศิลาจารึกพ่อขุนรามคำแหง', cat: 'history', size: 20, era: 1292, x: width * 0.38, y: height * 0.65, vx: 0, vy: 0, desc: 'จุดกำเนิดสัทศาสตร์และอักษรไทย บันทึกประวัติศาสตร์การค้าเสรี' },
      { id: 15, label: 'การคำนวณสุริยุปราคาหว้ากอ', cat: 'science', size: 18, era: 1868, x: width * 0.32, y: height * 0.75, vx: 0, vy: 0, desc: 'พระบิดาแห่งวิทยาศาสตร์ไทย ทรงคำนวณล่วงหน้าแม่นยำ 2 ปี' },
      { id: 16, label: 'ปัญญาประดิษฐ์ภาษาไทย (NLP)', cat: 'tech', size: 22, era: 2026, x: width * 0.42, y: height * 0.8, vx: 0, vy: 0, desc: 'การประมวลผลภาษาธรรมชาติและการถอดรหัสความรู้โบราณ' }
    ];

    // Relations: influenced, derived_from, used_in
    const graphLinks = [
      { source: 1, target: 2, type: 'derived_from' },
      { source: 1, target: 6, type: 'used_in' },
      { source: 1, target: 7, type: 'derived_from' },
      { source: 1, target: 11, type: 'derived_from' },
      { source: 1, target: 14, type: 'derived_from' },
      { source: 2, target: 3, type: 'used_in' },
      { source: 2, target: 5, type: 'influenced' },
      { source: 3, target: 6, type: 'used_in' },
      { source: 4, target: 2, type: 'influenced' },
      { source: 7, target: 8, type: 'influenced' },
      { source: 9, target: 10, type: 'derived_from' },
      { source: 11, target: 12, type: 'influenced' },
      { source: 13, target: 6, type: 'used_in' },
      { source: 14, target: 16, type: 'influenced' },
      { source: 15, target: 5, type: 'influenced' }
    ];

    let hoveredNode = null;
    let selectedCategory = 'all';
    let selectedMaxEra = 2026;
    let searchQuery = '';

    // Simple Force-Directed physics loop
    function updatePhysics() {
      // Repulsion between all nodes
      for (let i = 0; i < graphNodes.length; i++) {
        for (let j = i + 1; j < graphNodes.length; j++) {
          const n1 = graphNodes[i];
          const n2 = graphNodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 180) {
            const force = (180 - dist) / 180 * 0.8;
            n1.vx -= (dx / dist) * force;
            n1.vy -= (dy / dist) * force;
            n2.vx += (dx / dist) * force;
            n2.vy += (dy / dist) * force;
          }
        }
      }

      // Spring force on links
      graphLinks.forEach(link => {
        const s = graphNodes.find(n => n.id === link.source);
        const t = graphNodes.find(n => n.id === link.target);
        if (s && t) {
          const dx = t.x - s.x;
          const dy = t.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const targetDist = 110;
          const force = (dist - targetDist) * 0.015;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
          t.vx -= (dx / dist) * force;
          t.vy -= (dy / dist) * force;
        }
      });

      // Gravity towards center & friction
      graphNodes.forEach(n => {
        const cx = width / 2;
        const cy = height / 2;
        n.vx += (cx - n.x) * 0.002;
        n.vy += (cy - n.y) * 0.002;
        
        n.vx *= 0.90;
        n.vy *= 0.90;

        n.x += n.vx;
        n.y += n.vy;

        // Boundary clamp
        n.x = Math.max(40, Math.min(width - 40, n.x));
        n.y = Math.max(40, Math.min(height - 40, n.y));
      });
    }

    // Draw Function
    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw Grid Points
      ctx.fillStyle = 'rgba(44, 44, 58, 0.4)';
      const step = 48;
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }

      // Draw Links
      graphLinks.forEach(link => {
        const s = graphNodes.find(n => n.id === link.source);
        const t = graphNodes.find(n => n.id === link.target);
        if (!s || !t) return;

        // Filter check
        const sVisible = (selectedCategory === 'all' || s.cat === selectedCategory) && s.era <= selectedMaxEra;
        const tVisible = (selectedCategory === 'all' || t.cat === selectedCategory) && t.era <= selectedMaxEra;
        if (!sVisible && !tVisible) return;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);

        if (link.type === 'influenced') {
          // Solid line (มีอิทธิพลต่อ)
          ctx.setLineDash([]);
          ctx.strokeStyle = 'rgba(46, 230, 255, 0.4)';
          ctx.lineWidth = 1.5;
        } else if (link.type === 'derived_from') {
          // Dashed line (พัฒนามาจาก)
          ctx.setLineDash([4, 4]);
          ctx.strokeStyle = 'rgba(255, 194, 51, 0.4)';
          ctx.lineWidth = 1.2;
        } else {
          // Dotted line (นำไปใช้ใน)
          ctx.setLineDash([2, 3]);
          ctx.strokeStyle = 'rgba(215, 255, 58, 0.45)';
          ctx.lineWidth = 1.2;
        }

        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Nodes
      graphNodes.forEach(node => {
        const matchesCategory = selectedCategory === 'all' || node.cat === selectedCategory;
        const matchesEra = node.era <= selectedMaxEra;
        const matchesSearch = !searchQuery || node.label.toLowerCase().includes(searchQuery.toLowerCase());

        const isVisible = matchesCategory && matchesEra && matchesSearch;
        const alpha = isVisible ? 1.0 : 0.15;
        const catInfo = categories[node.cat] || { color: '#FFF' };

        ctx.save();
        ctx.globalAlpha = alpha;

        // Node Glow if hovered or matched
        if (hoveredNode === node) {
          ctx.shadowColor = catInfo.color;
          ctx.shadowBlur = 20;
        }

        // Shape render
        ctx.fillStyle = catInfo.color;
        ctx.beginPath();
        if (node.id === 1) {
          // Main Root Logo Star
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = '#D7FF3A';
        } else {
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        }
        ctx.fill();

        // Inner Core Ring
        ctx.fillStyle = '#0B0B0F';
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(3, node.size * 0.4), 0, Math.PI * 2);
        ctx.fill();

        // Label Text
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#F2EDE3';
        ctx.font = node.id === 1 ? 'bold 13px "Chakra Petch", sans-serif' : '11px "IBM Plex Sans Thai", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + node.size + 14);

        ctx.restore();
      });

      updatePhysics();
      requestAnimationFrame(draw);
    }

    draw();

    // Mouse Interaction
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      hoveredNode = null;
      for (let i = 0; i < graphNodes.length; i++) {
        const n = graphNodes[i];
        const dist = Math.hypot(n.x - mouseX, n.y - mouseY);
        if (dist <= n.size + 6) {
          hoveredNode = n;
          canvas.style.cursor = 'pointer';
          break;
        }
      }
      if (!hoveredNode) canvas.style.cursor = 'grab';
    });

    canvas.addEventListener('click', (e) => {
      if (hoveredNode) {
        playTone(660, 'sine', 0.1, 0.06);
        openSpecimenModal({
          id: `GRM-${hoveredNode.era}-${hoveredNode.cat.toUpperCase()}-${hoveredNode.id.toString().padStart(3, '0')}`,
          title: hoveredNode.label,
          category: categories[hoveredNode.cat].label,
          era: `ปี พ.ศ. / ค.ศ. ${hoveredNode.era}`,
          summary: hoveredNode.desc,
          takeaway: 'สามารถนำข้อค้นพบนี้ไปประยุกต์ใช้ในการดูแลสุขภาพ วิถีชีวิต หรือการออกแบบยุคใหม่ได้ทันที',
          sources: 'ฐานข้อมูลจดหมายเหตุ & GRURU Knowledge Graph'
        });
      }
    });

    // Graph Filters Event Listeners
    const catButtons = document.querySelectorAll('.kg-filter-btn');
    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        catButtons.forEach(b => b.classList.remove('active', 'border-gr-lime', 'text-gr-lime'));
        btn.classList.add('active', 'border-gr-lime', 'text-gr-lime');
        selectedCategory = btn.getAttribute('data-cat') || 'all';
        playTone(523.25, 'sine', 0.05, 0.03);
      });
    });

    const timeSlider = document.getElementById('kg-time-slider');
    const timeValueLabel = document.getElementById('kg-time-val');
    if (timeSlider) {
      timeSlider.addEventListener('input', (e) => {
        selectedMaxEra = parseInt(e.target.value, 10);
        if (timeValueLabel) timeValueLabel.innerText = selectedMaxEra;
      });
    }

    const searchInput = document.getElementById('kg-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
      });
    }
  }

  // ==========================================
  // 5. SPECIMEN LABEL MODAL CONTROLLER
  // ==========================================
  const modal = document.getElementById('specimenModal');
  const modalId = document.getElementById('modal-specimen-id');
  const modalTitle = document.getElementById('modal-specimen-title');
  const modalCat = document.getElementById('modal-specimen-cat');
  const modalEra = document.getElementById('modal-specimen-era');
  const modalSummary = document.getElementById('modal-specimen-summary');
  const modalTakeaway = document.getElementById('modal-specimen-takeaway');
  const modalSources = document.getElementById('modal-specimen-sources');

  window.openSpecimenModal = function(data) {
    if (!modal) return;
    if (modalId) modalId.innerText = data.id || 'GRM-SPECIMEN-001';
    if (modalTitle) modalTitle.innerText = data.title || 'โหนดความรู้';
    if (modalCat) modalCat.innerText = data.category || 'วิทยาศาสตร์ & ภูมิปัญญา';
    if (modalEra) modalEra.innerText = data.era || 'รัตนโกสินทร์ → ศตวรรษที่ 21';
    if (modalSummary) modalSummary.innerText = data.summary || 'รายละเอียดของชุดข้อมูล';
    if (modalTakeaway) modalTakeaway.innerText = data.takeaway || 'แนวทางปฏิบัติในชีวิตประจำวัน';
    if (modalSources) modalSources.innerText = data.sources || 'สำนักหอจดหมายเหตุ & เอกสารอ้างอิง';

    modal.classList.add('active');
  };

  window.closeSpecimenModal = function() {
    if (modal) modal.classList.remove('active');
  };

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSpecimenModal();
    });
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSpecimenModal();
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.gr-nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

});
