const header = document.getElementById("header");
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const cursorGlow = document.querySelector(".cursor-glow");

const setHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 28);
};

setHeader();
window.addEventListener("scroll", setHeader, { passive: true });

burger.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");

  burger.classList.toggle("active", opened);
  burger.setAttribute("aria-expanded", String(opened));
  document.body.classList.toggle("menu-open", opened);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    burger.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -6% 0px",
  }
);

document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;

  observer.observe(el);
});

window.addEventListener(
  "pointermove",
  (event) => {
    if (!cursorGlow) return;

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  },
  { passive: true }
);

// Небольшой parallax для стикеров на компьютере
if (window.matchMedia("(min-width: 761px)").matches) {
  const stickers = [...document.querySelectorAll(".sticker")];

  window.addEventListener(
    "pointermove",
    (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      stickers.forEach((sticker, index) => {
        const force = (index + 1) * 3;

        sticker.style.marginLeft = `${x * force}px`;
        sticker.style.marginTop = `${y * force}px`;
      });
    },
    { passive: true }
  );
}


/* =========================================
   HERO V2
   ========================================= */

const hero = document.querySelector(".hero");

if (hero) {

    /*
    ================================
    LOAD ANIMATION
    ================================
    */

    window.addEventListener("load", () => {

        requestAnimationFrame(() => {

            hero.classList.add("hero-loaded");

        });

    });


    /*
    ================================
    MOUSE PARALLAX
    ================================
    */

    if (
        window.matchMedia("(pointer: fine)").matches
    ) {

        hero.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();

                const mouseX =
                    (
                        event.clientX -
                        rect.left
                    )
                    /
                    rect.width;

                const mouseY =
                    (
                        event.clientY -
                        rect.top
                    )
                    /
                    rect.height;


                /*
                convert:
                0 -> -1
                0.5 -> 0
                1 -> 1
                */

                const x =
                    (
                        mouseX -
                        0.5
                    )
                    *
                    2;

                const y =
                    (
                        mouseY -
                        0.5
                    )
                    *
                    2;


                hero.style.setProperty(
                    "--mouse-x",
                    x
                );

                hero.style.setProperty(
                    "--mouse-y",
                    y
                );

            },
            {
                passive: true
            }
        );


        hero.addEventListener(
            "pointerleave",
            () => {

                hero.style.setProperty(
                    "--mouse-x",
                    0
                );

                hero.style.setProperty(
                    "--mouse-y",
                    0
                );

            }
        );

    }


    /*
    ================================
    RANDOM GLITCH
    ================================
    */

    const glitchText =
        hero.querySelector(".glitch");


    if (glitchText) {

        const randomGlitch = () => {

            const delay =
                Math.random()
                *
                5000
                +
                3500;


            setTimeout(() => {

                glitchText.classList.add(
                    "random-glitch"
                );


                setTimeout(() => {

                    glitchText.classList.remove(
                        "random-glitch"
                    );

                }, 180);


                randomGlitch();

            }, delay);

        };


        randomGlitch();

    }

}


/* =========================================
   CHAOS SKILLS
   ========================================= */

const chaosSkills =
    document.querySelectorAll(".chaos-skill");


chaosSkills.forEach((card) => {

    /*
    ============================
    CURSOR GLOW
    ============================
    */

    card.addEventListener(
        "pointermove",
        (event) => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            card.style.setProperty(
                "--skill-x",
                `${x}px`
            );


            card.style.setProperty(
                "--skill-y",
                `${y}px`
            );


            /*
            ============================
            SMALL 3D TILT
            ============================
            */

            if (
                window.matchMedia(
                    "(pointer: fine)"
                ).matches
            ) {

                const rotateY =
                    (
                        x /
                        rect.width
                        -
                        .5
                    )
                    *
                    3;


                const rotateX =
                    (
                        y /
                        rect.height
                        -
                        .5
                    )
                    *
                    -3;


                card.style.transform =
                    `
                    translateY(-7px)
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }

        }
    );


    /*
    ============================
    RESET
    ============================
    */

    card.addEventListener(
        "pointerleave",
        () => {

            card.style.removeProperty(
                "transform"
            );


            card.style.setProperty(
                "--skill-x",
                "50%"
            );


            card.style.setProperty(
                "--skill-y",
                "50%"
            );

        }
    );

});


/* =========================================
   PROJECTS V2
   ========================================= */

const megaProjects =
    document.querySelectorAll(".mega-project");


megaProjects.forEach((project) => {

    project.addEventListener(
        "pointermove",
        (event) => {

            const rect =
                project.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            project.style.setProperty(
                "--project-x",
                `${x}px`
            );


            project.style.setProperty(
                "--project-y",
                `${y}px`
            );

        }
    );


    project.addEventListener(
        "pointerleave",
        () => {

            project.style.setProperty(
                "--project-x",
                "50%"
            );


            project.style.setProperty(
                "--project-y",
                "50%"
            );

        }
    );

});