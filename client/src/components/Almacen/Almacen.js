import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { urlGetExistenciaProducto, urlGetProducto } from "../../util/rutasAPI";
import $ from "jquery";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadOneDate } from "./functions";

export const Almacen = (props) => {
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    $(document).ready(function () {
      var table = $("#table-almacen").DataTable({
        bProcessing: true,
        ajax: {
          method: "GET",
          url: urlGetProducto,
          data: { operacion: "datos" },
          headers: {
            Authorization: localStorage.getItem("auth-token"),
          },
        },
        columns: [
          {
            data: "",
            searchable: false,
            render: function (value, date) {
              return value;
            },
          },
          {
            data: "Id_Producto",
            type: "string",
            visible: true,
            searchable: true,
          },
          {
            data: "Desc_Producto",
            type: "string",
            visible: true,
            searchable: true,
          },
          {
            data: "Fecha_Entrada",
            type: "string",
            visible: true,
            searchable: false,
            render: function (value) {
              if (value === null) return "";
              var dt = new Date(value);
              if (dt.getFullYear() === 9999) return "";
              return (
                dt.getDate() +
                "/" +
                (dt.getMonth() + 1) +
                "/" +
                dt.getFullYear()
              );
            },
          },
        ],
        columnDefs: [
          {
            targets: 0,
            data: null,
            searchable: false,
            defaultContent: "",
            createdCell: function (td, cellData, rowData, row, col) {
              if (cellData < 1) $(td).addClass("details-control");
            },
          },
        ],
        dom: "BRlfrtipRT",
        pageLength: 10,
        processing: true,
        serverSide: true,
        destroy: true,
        buttons: ["copy", "csv", "excel", "print"],
        language: {
          sProcessing:
            "<div class='loaderTable' style='display: block;width:50px;height:50px;margin:0 auto;'></div>",
          sLengthMenu: "Mostrar _MENU_ registros",
          sZeroRecords: "No se encontraron resultados",
          sEmptyTable: "Ningún dato disponible en esta tabla",
          sInfo:
            "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
          sInfoEmpty:
            "Mostrando registros del 0 al 0 de un total de 0 registros",
          sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
          sInfoPostFix: "",
          sSearch: "Buscar:",
          searchPlaceholder: "Filtro Universal...",
          sUrl: "",
          sInfoThousands: ",",
          sLoadingRecords:
            "<div class='loaderTable' style='display: block;width:50px;height:50px;margin:0 auto;'></div>",
          oPaginate: {
            sFirst: "Primero",
            sLast: "Último",
            sNext: "Siguiente",
            sPrevious: "Anterior",
          },
          oAria: {
            sSortAscending:
              ": Activar para ordenar la columna de manera ascendente",
            sSortDescending:
              ": Activar para ordenar la columna de manera descendente",
          },
        },
      });

      //////////////////////HABRIR TABLA DE DETALLES///////////////////////////////
      $("#table-almacen tbody").on("click", "td.details-control", function (e) {
        e.preventDefault();
        var tr = $(this).closest("tr");
        var row = table.row(tr);
        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass("shown");
        } else {
          row
            .child(
              `<table id="${tr[0].cells[1].innerText}_table" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; class="table"">` +
                "<thead>" +
                "<tr>" +
                `<th class='details-control sorting_disabled' disabled> </th>` +
                "<th>Id Almacen</th>" +
                "<th>Id Lote</th>" +
                "<th>Fecha Entrada</th>" +
                "<th>Fecha Vence</th>" +
                "<th>Saldo Existencia</th>" +
                "<th>Saldo Existencia</th>" +
                "</tr>" +
                "</thead>" +
                "</table>"
            )
            .show();
          tr.addClass("shown");
          $(document).ready(function () {
            var tableDetalle = $(
              `#${tr[0].cells[1].innerText}_table`
            ).DataTable({
              bProcessing: true,
              ajax: {
                method: "GET",
                url: urlGetExistenciaProducto,
                data: { id: tr[0].cells[1].innerText },
                headers: {
                  Authorization: localStorage.getItem("auth-token"),
                },
              },
              dom: "Brti",
              pageLength: 10,
              destroy: true,
              buttons: [],
              columns: [
                {
                  data: "",
                  searchable: false,
                  render: function (value, date) {
                    return value;
                  },
                },
                {
                  data: "Id_Almacen",
                  type: "string",
                  visible: true,
                  searchable: true,
                },
                {
                  data: "Id_Lote",
                  type: "string",
                  visible: true,
                  searchable: true,
                },
                {
                  data: "Fecha_Entrada",
                  type: "date",
                  visible: true,
                  searchable: true,
                  render: function (value) {
                    if (value === null) return "";
                    var dt = new Date(value);
                    if (dt.getFullYear() === 9999) return "";
                    return (
                      dt.getDate() +
                      "/" +
                      (dt.getMonth() + 1) +
                      "/" +
                      dt.getFullYear()
                    );
                  },
                },
                {
                  data: "Fecha_Vence",
                  type: "date",
                  visible: true,
                  searchable: true,
                  render: function (value) {
                    if (value === null) return "";
                    var dt = new Date(value);
                    if (dt.getFullYear() === 9999) return "";
                    return (
                      dt.getDate() +
                      "/" +
                      (dt.getMonth() + 1) +
                      "/" +
                      dt.getFullYear()
                    );
                  },
                },
                {
                  data: "Saldo_Existencia",
                  type: "string",
                  visible: true,
                  searchable: true,
                },
                {
                  data: "Disponibles",
                  type: "string",
                  visible: true,
                  searchable: true,
                },
              ],
              columnDefs: [
                {
                  targets: 0,
                  data: null,
                  searchable: false,
                  defaultContent: "",
                  createdCell: function (td, cellData, rowData, row, col) {
                    if (cellData < 1) $(td).addClass("details-control");
                  },
                },
              ],
              language: {
                sProcessing:
                  "<div class='loaderTable' style='display: block;width:50px;height:50px;margin:0 auto;'></div>",
                sLengthMenu: "Mostrar _MENU_ registros",
                sZeroRecords: "No se encontraron resultados",
                sEmptyTable: "Ningún dato disponible en esta tabla",
                sInfo:
                  "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoEmpty:
                  "Mostrando registros del 0 al 0 de un total de 0 registros",
                sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                sInfoPostFix: "",
                sSearch: "Buscar:",
                searchPlaceholder: "Filtro...",
                sUrl: "",
                sInfoThousands: ",",
                sLoadingRecords:
                  "<div class='loaderTable' style='display: block;width:50px;height:50px;margin:0 auto;'></div>",
                oPaginate: {
                  sFirst: "Primero",
                  sLast: "Último",
                  sNext: ">",
                  sPrevious: "<",
                },
                oAria: {
                  sSortAscending:
                    ": Activar para ordenar la columna de manera ascendente",
                  sSortDescending:
                    ": Activar para ordenar la columna de manera descendente",
                },
              },
            });

            /////////////MAS DATALLE//////////////
            $(`#${tr[0].cells[1].innerText}_table tbody`).on(
              "click",
              "td.details-control",
              function (e) {
                e.preventDefault();
                var data3;
                setTimeout(() => {
                  var d = tableDetalle.data().toArray();
                  data3 = d[0];
                  var trD = $(this).closest("tr");
                  var rowD = tableDetalle.row(trD);
                  if (rowD.child.isShown()) {
                    rowD.child.hide();
                    trD.removeClass("shown");
                  } else {
                    rowD
                      .child(
                        `
                        <div id="myModal${data3.Id_Producto.trim()}" class="modal myModal${data3.Id_Producto.trim()}">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h2>${tr[0].cells[2].innerText.trim()} con ID: ${data3.Id_Producto.trim()} en Almacen: ${
                                                data3.Id_Almacen
                                              }</h2>
                                <span class="close close${data3.Id_Producto.trim()}">×</span>
                            </div>
                            
                            <table id="myTable" class="myTable myTable${data3.Id_Producto.trim()}">
                              <tbody>
                                <tr className="header">
                                  <th style={{width: '60%'}}><input type="text" id="myInput" onkeyup="myFunction()" placeholder="Filtrar campo..." /></th>
                                  <th style={{width: '40%'}}></th>
                                </tr>
                                <tr className="header">
                                  <th style={{width: '60%'}}>Campo</th>
                                  <th style={{width: '40%'}}>Valor</th>
                                </tr>
                                <tr>
                                  <td>Id de Lote</td>
                                  <td>${data3.Id_Lote}</td>
                                </tr>
                                <tr>
                                  <td>Referencia</td>
                                  <td>${data3.Referencia}</td>
                                </tr>
                                <tr>
                                  <td>Fecha de Entrada</td>
                                  <td>${formatoFecha(data3.Fecha_Entrada)}</td>
                                </tr>
                                <tr>
                                  <td>Fecha de Vencimiento</td>
                                  <td>${formatoFecha(data3.Fecha_Vence)}</td>
                                </tr>
                                <tr>
                                  <td>Saldo en Existencia</td>
                                  <td>${data3.Saldo_Existencia}</td>
                                </tr>
                                <tr>
                                  <td>Reservadas</td>
                                  <td>${data3.Reservadas}</td>
                                </tr>
                                <tr>
                                  <td>Disponibles</td>
                                  <td>${data3.Disponibles}</td>
                                </tr>
                                <tr>
                                  <td>Sección</td>
                                  <td>${data3.Seccion}</td>
                                </tr>
                                <tr>
                                  <td>Estante</td>
                                  <td>${data3.Estante}</td>
                                </tr>
                                <tr>
                                  <td>Casilla</td>
                                  <td>${data3.Casilla}</td>
                                </tr>
                                <tr>
                                  <td>Precio del CostoMB</td>
                                  <td>${data3.Precio_CostoMB}</td>
                                </tr>
                                <tr>
                                  <td>Precio del CostoMC</td>
                                  <td>${data3.Precio_CostoMC}</td>
                                </tr>
                                <tr>
                                  <td>Costo de ArancelMB</td>
                                  <td>${data3.Costo_ArancelMB}</td>
                                </tr>
                                <tr>
                                  <td>Costo de ArancelMC</td>
                                  <td>${data3.Costo_ArancelMC}</td>
                                </tr>
                                <tr>
                                  <td>ImporteMB</td>
                                  <td>${data3.ImporteMB}</td>
                                </tr>
                                <tr>
                                  <td>ImporteMC</td>
                                  <td>${data3.ImporteMC}</td>
                                </tr>
                                <tr>
                                  <td>Fecha de Inicio</td>
                                  <td>${formatoFecha(data3.Fecha_Inicio)}</td>
                                </tr>
                                <tr>
                                  <td>Existencia en Inicio</td>
                                  <td>${data3.Existencia_Inicio}</td>
                                </tr>
                                <tr>
                                  <td>Precio de InicioMC</td>
                                  <td>${data3.Precio_InicioMC}</td>
                                </tr>
                                <tr>
                                  <td>Precio de InicioMB</td>
                                  <td>${data3.Precio_InicioMB}</td>
                                </tr>
                                <tr>
                                  <td>Importe de InicioMB</td>
                                  <td>${data3.Importe_InicioMB}</td>
                                </tr>
                                <tr>
                                  <td>Importe de InicioMC</td>
                                  <td>${data3.Importe_InicioMC}</td>
                                </tr>
                                <tr>
                                  <td>Zona</td>
                                  <td>${data3.Zona}</td>
                                </tr>
                                <tr>
                                  <td>Conteo</td>
                                  <td>${data3.Conteo}</td>
                                </tr>
                                <tr>
                                  <td>Fecha de Conteo</td>
                                  <td>${formatoFecha(data3.Fecha_Conteo)}</td>
                                </tr>
                                <tr>
                                  <td>Marca</td>
                                  <td>${data3.Marca}</td>
                                </tr>
                                <tr>
                                  <td>Fecha último Mov</td>
                                  <td>${formatoFecha(data3.Fecha_LastMov)}</td>
                                </tr>
                                <tr>
                                  <td>Documento</td>
                                  <td>${data3.Documto}</td>
                                </tr>
                                <tr>
                                  <td>Estado</td>
                                  <td>${data3.Estado}</td>
                                </tr>
                                <tr>
                                  <td>Empaque</td>
                                  <td>${data3.Empaque}</td>
                                </tr>
                                <tr>
                                  <td>Empaque Inicio</td>
                                  <td>${data3.Empaque_Inicio}</td>
                                </tr>
                                <tr>
                                  <td>InvFisico</td>
                                  <td>${data3.InvFisico}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          </div>
                          </div>
                        </div>
                    `
                      )
                      .show();
                    trD.addClass("shown");

                    var modal = document.querySelector(
                      `.myModal${data3.Id_Producto.trim()}`
                    );
                    var span = document.getElementsByClassName(`close${data3.Id_Producto.trim()}`)[0];
                    setTimeout(() => {
                      modal.style.display = "block";
                    }, 100);
                    span.onclick = function () {
                      modal.style.display = "none";
                      rowD.child.hide();
                      trD.removeClass("shown");
                    };
                    window.onclick = function (event) {
                      if (event.target == modal) {
                        modal.style.display = "none";
                        rowD.child.hide();
                        trD.removeClass("shown");
                      }
                    };
                  }
                }, 100);
              }
            );
          });
        }
      });
    });
  }, []);

  function formatoFecha(value) {
    if (value === null) return "";
    var dt = new Date(value);
    if (dt.getFullYear() === 9999) return "";
    return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
  }

  return (
    <>
      <Breadcrumb text="Productos en existencia" />
      <div className="contentArea">
        <table id="table-almacen" className="table table-hover">
          <thead>
            <tr>
              <th className="details-control sorting_disabled" disabled></th>
              <th>Id Producto</th>
              <th>Nomber del Producto</th>
              <th>Fecha de Entrada</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default Almacen;
