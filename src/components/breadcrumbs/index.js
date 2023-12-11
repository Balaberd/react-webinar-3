import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';
import { NavLink } from "react-router-dom";

function Breadcrumbs({classNames}) {

  const cn = bem('Breadcrumbs');

  return (
    <div className={classNames}>
      <NavLink className={cn('item')} to='/'>Главная</NavLink>
    </div>
  );
}

Breadcrumbs.propTypes = {
  classNames: PropTypes.string,
};

export default memo(Breadcrumbs);
