import React from "react";
import styles from "./index.module.scss";

const List = ({ listJson }) => {
  const listItems = listJson.edges.map((item) => {
    return item.node;
  });

  return (
    <>
      <ul className={styles.list}>
        {listItems.map((item) => {
          return (
            <li className={styles.item} key={item.name}>
              <div>
                <span dangerouslySetInnerHTML={{ __html: item.name }}></span>

                {item.link && (
                  <>
                    &nbsp;&mdash;&nbsp;
                    <a
                      href={item.link}
                      rel="noopener noreferrer"
                      target="_blank"
                      className={`${styles.link}`}
                    >
                      link
                    </a>
                  </>
                )}

                {item.description && (
                  <div>
                    <small>{item.description}</small>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default List;
