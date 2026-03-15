"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollReveal = () => {
  const pathname = usePathname();

  useEffect(() => {
    const revealNow = (node: HTMLElement) => {
      node.classList.add("is-visible");
    };

    const revealInView = () => {
      const viewport = window.innerHeight * 0.95;
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(".h-reveal"),
      );
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top <= viewport) {
          revealNow(node);
        }
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(".h-reveal"),
      );
      nodes.forEach(revealNow);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealNow(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    const scanAndObserve = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(".h-reveal"),
      );
      nodes.forEach((node) => {
        if (node.dataset.hRevealObserved) return;
        node.dataset.hRevealObserved = "1";
        observer.observe(node);
      });
      revealInView();
    };

    scanAndObserve();
    revealInView();
    const handleResize = () => revealInView();
    const handleScroll = () => revealInView();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
};

export default ScrollReveal;
