import $ from "jquery";
import * as sections from "@shopify/theme-sections";

const AtcCollectionDropdown = () => {
  $(".atc-init").on("click", (e) => {
    const parent = $(e.currentTarget).parentsUntil(
      ".featured-collection-dropdown-container"
    );
    const selectedVariant = parent.find(".atc-variants").val();
    parent.attr("data-selected-variant", selectedVariant);
    $.post({
      url: "/cart/add.js",
      data: {
        id: selectedVariant,
        quantity: 1,
      },
      dataType: "json",
      success: () => {
        const currentVal = parseInt($(".cart-count").attr("data-cart-count"));
        const newVal = currentVal + 1;
        $(".cart-count .count").html(newVal);
        $(".cart-count").attr("data-cart-count", newVal);
        console.log(parent.parent().find('.popup-options'))
        parent
          .parent()
          .parent()
          .find(".popup-options")
          .addClass("active");
      },
      fail: (err) => {
        console.log(err);
      },
    });
  });
  $(".popup-options").on("click", ".atc-extra-add", (e) => {
    const ep = $(e.currentTarget)
      .parent()
      .find(".extra-product");
    const epid = ep.attr("data-variant-id");
    const epq = parseInt(ep.val());
    console.log(epid, epq);
    $.post({
      url: "/cart/add.js",
      data: {
        id: epid,
        quantity: epq,
      },
      dataType: "json",
      success: () => {
        const currentVal = parseInt($(".cart-count").attr("data-cart-count"));
        const newVal = currentVal + epq;
        $(".cart-count .count").html(newVal);
        $(".cart-count").attr("data-cart-count", newVal);
        $(e.currentTarget).html("Remove");
        $(e.currentTarget).addClass("atc-extra-remove");
        $(e.currentTarget).removeClass("atc-extra-add");
      },
      fail: (err) => {
        console.log(err);
      },
    });
  });
  $(".popup-options").on("click", ".atc-extra-remove", (e) => {
    const ep = $(e.currentTarget)
      .parent()
      .find(".extra-product");
    const epid = ep.attr("data-variant-id");
    const epq = parseInt(ep.val());
    $.post({
      url: "/cart/remove.js",
      data: {
        id: epid,
        quantity: epq,
      },
      dataType: "json",
      success: () => {
        const currentVal = parseInt($(".cart-count").attr("data-cart-count"));
        const newVal = currentVal - epq;
        $(".cart-count .count").html(newVal);
        $(".cart-count").attr("data-cart-count", newVal);
        $(e.currentTarget).html("Add");
        $(e.currentTarget).addClass("atc-extra-add");
        $(e.currentTarget).removeClass("atc-extra-remove");
      },
      fail: (err) => {
        console.log(err);
      },
    });
  });
  $(".popup-options .action-close").on("click", (e) => {
    const parent = $(e.currentTarget).parentsUntil(
      ".featured-collection-dropdown-container"
    );
    parent
      .parent()
      .find(".popup-options")
      .removeClass("active");
  });
  $(".atc-main").on("change", (e) => {
    const currentProduct = $(e.currentTarget).val();
    $(e.currentTarget)
      .parent()
      .find(".select-options")
      .each((i, val) => {
        if ($(val).attr("data-product-id") === currentProduct) {
          $(val).addClass("active");
        } else {
          $(val).removeClass("active");
        }
      });
  });
};

sections.register("featured-collection-dropdown", {
  onLoad: () => {
    AtcCollectionDropdown();
  },
});
