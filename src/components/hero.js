"use client"; // Add this line to mark the file as a client component

import { useEffect } from "react";
import $ from "jquery";
import { TweenMax } from "gsap";
import styles from "./hero.module.css";

export default function Hero() {
  useEffect(() => {
    $('html').mousemove(function (e) {
      var wx = $(window).width();
      var wy = $(window).height();
      var x = e.pageX;
      var y = e.pageY;
      var newx = x - wx / 2;
      var newy = y - wy / 2;

      $('#wrapper div').each(function () {
        var speed = $(this).attr('data-speed');
        if ($(this).attr('data-revert')) speed *= -1;
        TweenMax.to($(this), 1, { x: (1 - newx * speed), y: (1 - newy * speed) });
      });
    });
  }, []);

  return (
    <div className={styles.contaianer}>
      <section id="wrapper" className={styles.wrapper}>
        <div className={styles.p1} data-revert="true" data-speed="0.01"></div>
        <div className={styles.word} data-speed="0">
          Raspberry
        </div>
      </section>
    </div>
  );
}
